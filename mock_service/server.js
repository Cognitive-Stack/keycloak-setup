/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { Issuer, generators } = require('openid-client');

const app = express();
const port = Number(process.env.PORT || 3000);
const appBaseUrl = process.env.APP_BASE_URL || `http://localhost:${port}`;

// Basic session setup (use a persistent store for production)
app.use(
  session({
    name: 'mock_service.sid',
    secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
    },
  })
);

// Health endpoint
app.get('/healthz', (_req, res) => res.json({ status: 'ok' }));

let oidcClient;
let discoveredIssuer;

async function initializeOidcClient() {
  const issuerUrl = process.env.KEYCLOAK_ISSUER_URL || 'http://localhost:8099/realms/myrealm';
  const clientId = process.env.KEYCLOAK_CLIENT_ID || 'node-api-client';
  const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET || '';
  const redirectUri = process.env.REDIRECT_URI || `${appBaseUrl}/oidc/callback`;

  discoveredIssuer = await Issuer.discover(issuerUrl);

  oidcClient = new discoveredIssuer.Client({
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uris: [redirectUri],
    response_types: ['code'],
    token_endpoint_auth_method: 'client_secret_post',
  });

  console.log('Discovered issuer:', discoveredIssuer.issuer);
  console.log('Redirect URI:', redirectUri);
}

function ensureInitialized(_req, res, next) {
  if (!oidcClient) {
    res.status(503).send('OIDC not initialized yet. Try again shortly.');
    return;
  }
  next();
}

function isAuthenticated(req) {
  return Boolean(req.session.user);
}

app.get('/', (req, res) => {
  const loggedIn = isAuthenticated(req);
  res.type('html').send(`
  <html>
    <head><title>Mock Service</title></head>
    <body>
      <h1>Mock Service with Keycloak Login</h1>
      ${loggedIn ? `<p>Logged in as: <strong>${req.session.user?.claims?.email || req.session.user?.claims?.sub}</strong></p>` : '<p>Not logged in</p>'}
      <ul>
        <li><a href="/login/google">Login with Google (via Keycloak)</a></li>
        <li><a href="/login/github">Login with GitHub (via Keycloak)</a></li>
      </ul>
      <ul>
        <li><a href="/me">View profile</a></li>
        <li><a href="/logout">Logout</a></li>
      </ul>
    </body>
  </html>
  `);
});

app.get('/login/:provider', ensureInitialized, async (req, res) => {
  const provider = String(req.params.provider || '').toLowerCase();
  if (!['google', 'github'].includes(provider)) {
    res.status(400).send('Unsupported provider');
    return;
  }

  const scope = process.env.OIDC_SCOPE || 'openid email profile';

  const state = generators.state();
  const nonce = generators.nonce();
  const codeVerifier = generators.codeVerifier();
  const codeChallenge = generators.codeChallenge(codeVerifier);

  req.session.oidc = { state, nonce, codeVerifier };

  const authorizationUrl = oidcClient.authorizationUrl({
    scope,
    state,
    nonce,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    kc_idp_hint: provider,
    // prompt: 'login', // uncomment if you want to force the login screen every time
  });

  res.redirect(authorizationUrl);
});

app.get('/oidc/callback', ensureInitialized, async (req, res, next) => {
  try {
    const params = oidcClient.callbackParams(req);
    const { state, nonce, codeVerifier } = req.session.oidc || {};
    if (!state || !nonce || !codeVerifier) {
      res.status(400).send('Missing OIDC session context');
      return;
    }

    const redirectUri = process.env.REDIRECT_URI || `${appBaseUrl}/oidc/callback`;

    const tokenSet = await oidcClient.callback(redirectUri, params, {
      state,
      nonce,
      code_verifier: codeVerifier,
    });

    const claims = tokenSet.claims();
    let userinfo = {};
    try {
      userinfo = await oidcClient.userinfo(tokenSet);
    } catch (e) {
      console.warn('Failed to fetch userinfo:', e.message);
    }

    req.session.user = {
      idToken: tokenSet.id_token,
      accessToken: tokenSet.access_token,
      refreshToken: tokenSet.refresh_token,
      claims: { ...claims, ...userinfo },
    };

    delete req.session.oidc;

    res.redirect('/me');
  } catch (err) {
    next(err);
  }
});

app.get('/me', (req, res) => {
  if (!isAuthenticated(req)) {
    res.status(401).type('html').send('<p>Not authenticated. <a href="/">Go home</a></p>');
    return;
  }
  const { claims, accessToken, refreshToken } = req.session.user;
  res.type('html').send(`
  <html>
    <head><title>Profile</title></head>
    <body>
      <h2>Claims</h2>
      <pre>${escapeHtml(JSON.stringify(claims, null, 2))}</pre>
      <h2>Access Token (truncated)</h2>
      <pre>${escapeHtml((accessToken || '').slice(0, 32))}...</pre>
      <h2>Refresh Token (truncated)</h2>
      <pre>${escapeHtml((refreshToken || '').slice(0, 32))}...</pre>
      <p><a href="/">Home</a> | <a href="/logout">Logout</a></p>
    </body>
  </html>
  `);
});

app.get('/logout', ensureInitialized, (req, res) => {
  const endSessionEndpoint = discoveredIssuer.end_session_endpoint;
  const idToken = req.session.user?.idToken;
  req.session.destroy(() => {
    if (!endSessionEndpoint || !idToken) {
      res.redirect('/');
      return;
    }
    const postLogoutRedirectUri = `${appBaseUrl}/`;
    const url = new URL(endSessionEndpoint);
    url.searchParams.set('id_token_hint', idToken);
    url.searchParams.set('post_logout_redirect_uri', postLogoutRedirectUri);
    res.redirect(url.toString());
  });
});

// Simple HTML escape
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

initializeOidcClient()
  .then(() => {
    app.listen(port, () => {
      console.log(`Mock service listening on ${appBaseUrl}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize OIDC client:', err);
    process.exit(1);
  }); 