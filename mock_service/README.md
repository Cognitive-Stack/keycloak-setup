# Mock Service (Keycloak + GitHub/Google via kc_idp_hint)

A minimal Express app that authenticates via Keycloak and forces GitHub or Google login using `kc_idp_hint`.

## Prereqs

- Keycloak running at `http://localhost:8099` with realm `myrealm` (see root README)
- A confidential client in Keycloak (e.g., `node-api-client`)
  - Client authentication: On
  - Standard flow: On
  - Add redirect URI: `http://localhost:3000/oidc/callback`

## Setup

```bash
cd mock_service
cp .env.example .env
# Edit .env and fill KEYCLOAK_CLIENT_SECRET and any other values you changed
npm install
npm start
```

Open `http://localhost:3000` and click:
- Login with Google (via Keycloak)
- Login with GitHub (via Keycloak)

This app sets `kc_idp_hint` to force the chosen social provider at Keycloak.

## Environment variables

- `KEYCLOAK_ISSUER_URL` (default: `http://localhost:8099/realms/myrealm`)
- `KEYCLOAK_CLIENT_ID` (default: `node-api-client`)
- `KEYCLOAK_CLIENT_SECRET` (required)
- `REDIRECT_URI` (default: `http://localhost:3000/oidc/callback`)
- `APP_BASE_URL` (default: `http://localhost:3000`)
- `SESSION_SECRET` (required in production)
- `OIDC_SCOPE` (default: `openid email profile`)

## Notes

- Ensure Google/GitHub IdPs are configured in Keycloak as per the root README.
- To add Microsoft later, create `/login/microsoft` route and use `kc_idp_hint=microsoft`.
- For production, configure HTTPS, secure cookies, and a persistent session store. 