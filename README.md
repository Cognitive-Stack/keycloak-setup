# Keycloak on Docker + Google, GitHub, Microsoft (Azure) Login (New UI)

A from-scratch, copy-paste guide that matches the new Keycloak UI (v25+). Uses port 8099 like the screenshots. If you prefer 8080, replace the port everywhere below.

---

## 0) Prerequisites

- Docker installed
- Accounts for Google Cloud, GitHub, and Azure (Microsoft Entra)
- Decide your realm name (examples use `myrealm`)

---

## 1) Run Keycloak locally (Docker)

```bash
docker run --name keycloak -p 8099:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:26.3.2 \
  start-dev
```

Open admin console: `http://localhost:8099/admin`

---

## 2) Create Realm

- Top-left realm selector → Create realm
- Name: `myrealm` → Create

---

## 3) (Optional) Create a Client for your API/app

- Clients → Create client
- Client ID: `node-api-client`
- Client type: OpenID Connect → Save
- Capability config
  - Client authentication: On (confidential)
  - Standard flow: On
  - Direct access grants: On (for quick curl tests)
  - Save
- Credentials tab → copy Client secret

---

## 4) Google Login

### 4.1 Create OAuth client in Google

- Google Cloud Console → APIs & Services → OAuth consent screen
  - User type: External → fill minimum details → Save/Publish
- Credentials → Create Credentials → OAuth client ID
  - Application type: Web
  - Authorized redirect URI:

    ```
    http://localhost:8099/realms/myrealm/broker/google/endpoint
    ```

- Create → copy Client ID and Client Secret

### 4.2 Add OpenID Connect provider (Google) in Keycloak

- Identity providers → Add provider → OpenID Connect v1.0
- Fill:
  - Redirect URI: (auto; verify it matches the Google redirect you registered)
  - Alias: `google`
  - Display name: `Google`
  - Use discovery endpoint: On
  - Discovery endpoint:

    ```
    https://accounts.google.com/.well-known/openid-configuration
    ```

  - Client authentication: Client secret sent as post
  - Client ID: (from Google)
  - Client Secret: (from Google)
  - Save

---

## 5) GitHub Login

### 5.1 Create GitHub OAuth app

- GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
- Fill:
  - Homepage URL: `http://localhost:8099`
  - Authorization callback URL:

    ```
    http://localhost:8099/realms/myrealm/broker/github/endpoint
    ```

- Create → copy Client ID and Client Secret

### 5.2 Add GitHub provider in Keycloak (new UI)

- Identity providers → Add provider → GitHub
- Fill:
  - Redirect URI: (auto; verify it matches the GitHub callback)
  - Alias: `github`
  - Display name: `GitHub`
  - Client ID / Client Secret: (from GitHub)
  - Base URL: `https://github.com`
  - API URL: `https://api.github.com`
  - Save
- After save, ensure default scopes include: `read:user` `user:email`

---

## 6) Microsoft (Azure) Login

### 6.1 Register app in Azure (Microsoft Entra)

- Azure Portal → Microsoft Entra ID → App registrations → New registration
- Supported account types: Accounts in any organizational directory and personal Microsoft accounts
- Redirect URI (Web):

  ```
  http://localhost:8099/realms/myrealm/broker/microsoft/endpoint
  ```

- Register → copy Application (client) ID
- Certificates & secrets → New client secret → copy the secret value

### 6.2 Add OpenID Connect provider (Microsoft) in Keycloak

- Identity providers → Add provider → OpenID Connect v1.0
- Fill:
  - Alias: `microsoft`
  - Display name: `Microsoft`
  - Use discovery endpoint: On
  - Discovery endpoint:

    ```
    https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration
    ```

  - Client authentication: Client secret sent as post
  - Client ID / Client Secret: (from Azure)
  - Save

Note: Microsoft photos are not in ID token by default; skip avatar for now or fetch via Graph API later.

---

## 7) Attribute Mapping (Mappers) — New UI

Identity providers → select provider (e.g., Google) → Mappers → Create

### Google mappers

- Email
  - Mapper type: Attribute Importer
  - Claim: `email` → User attribute: `email`
- First name
  - Mapper type: Attribute Importer
  - Claim: `given_name` → User attribute: `firstName`
- Last name
  - Mapper type: Attribute Importer
  - Claim: `family_name` → User attribute: `lastName`
- Avatar
  - Mapper type: Attribute Importer
  - Claim: `picture` → User attribute: `avatar`
- For each: Sync mode: Force

### GitHub mappers

- Username
  - Mapper type: Username Template Importer
  - Template: `${CLAIM:login}`
- Email
  - Mapper type: Attribute Importer
  - Claim: `email` → User attribute: `email`
- Avatar
  - Mapper type: Attribute Importer
  - Claim: `avatar_url` → User attribute: `avatar`
- Ensure default scopes include: `read:user` `user:email`
- For each Attribute Importer: Sync mode: Force

### Microsoft mappers

- Email → Attribute Importer: Claim `email` → User attribute `email`
- First name → Attribute Importer: Claim `given_name` → User attribute `firstName`
- Last name → Attribute Importer: Claim `family_name` → User attribute `lastName`
- Set Sync mode: Force

---

## 8) Make avatar visible in the new UI (User Profile)

Keycloak v25+ only shows attributes that exist in User profile.

- Realm settings → User profile → Attributes → Create attribute
  - Name: `avatar`
  - Display name: `Avatar`
  - Type: String
  - Permissions: Viewable by Admin and User
  - Save

After a social login, go to Users → (user) → Attributes to see the avatar URL.

---

## 9) Enable social login & test

- Realm settings → Login
  - Identity Provider Redirect (optional) → On → Save

Test page:

- Open: `http://localhost:8099/realms/myrealm/account`
- You should see Google / GitHub / Microsoft buttons
- Log in → check Users → (your user) → Attributes for `avatar`

---

## 10) Quick token test against your API (optional)

Install deps:

```bash
npm i express express-jwt jwks-rsa
```

Create `app.js`:

```js
const express = require('express');
const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const app = express();
const port = 3000;

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    jwksUri: 'http://localhost:8099/realms/myrealm/protocol/openid-connect/certs',
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
  }),
  audience: 'node-api-client',
  issuer: 'http://localhost:8099/realms/myrealm',
  algorithms: ['RS256'],
});

app.get('/public', (_, res) => res.json({ ok: true }));
app.get('/protected', checkJwt, (req, res) => res.json({ ok: true, sub: req.auth.sub }));

app.listen(port, () => console.log(`http://localhost:${port}`));
```

Run and test protected endpoint with a bearer token from Keycloak.

---

## 11) Export / Import realm config (for deployment)

Export (no users):

```bash
docker exec -it keycloak \
  /opt/keycloak/bin/kc.sh export \
  --dir /opt/keycloak/data/import \
  --realm myrealm --users skip

docker cp keycloak:/opt/keycloak/data/import ./exports
# => ./exports/myrealm-realm.json
```

Import on startup:

```bash
docker run --name keycloak-prod -p 8080:8080 \
  -v $(pwd)/exports:/opt/keycloak/data/import \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:26.3.2 \
  start-dev --import-realm
```

---

## 12) Troubleshooting (new UI specifics)

- No “Attributes” tab: create the attribute in User profile (step 8) and re-login
- `invalid redirect_uri`: callback must match exactly (host, port, path)
- GitHub email empty: add `user:email` scope and verify the email on the GitHub account
- Google fields don’t auto-fill: ensure “Use discovery endpoint” is On and the discovery URL is exact
- Different port: if you change Keycloak port, update all IdP redirect URIs
