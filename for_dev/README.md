# Keycloak Quick Setup for Developers (for_dev)

This folder provides a ready-to-use template to spin up Keycloak locally with a preconfigured realm, client, and social providers (Google, GitHub, Microsoft) using the new UI (v25+).

## What’s included

- `realm-template.json`: A minimal realm export with placeholders for client secret and IdP credentials
- `providers.example.json`: Example credentials file; copy to `providers.json` and fill in secrets/IDs
- `Makefile`: Commands to generate a realm JSON and run Keycloak Docker with import

## Quick start

1) Fill provider credentials

```bash
cd for_dev
cp providers.example.json providers.json
# Edit providers.json and set:
# - keycloak.clientSecret (from your client in Keycloak, or leave and set later)
# - google.clientId / google.clientSecret
# - github.clientId / github.clientSecret
# - microsoft.clientId / microsoft.clientSecret
```

2) Generate realm JSON and start Keycloak

```bash
make up
# This will:
# - Merge providers.json into realm-template.json → ./data/import/myrealm-realm.json
# - Start Keycloak at http://localhost:8098 with --import-realm
```

3) Open the admin console

- `http://localhost:8098/admin` (admin / admin)
- Confirm realm `myrealm`, client `node-api-client`, IdPs Google/GitHub/Microsoft are present

4) Test login page

- `http://localhost:8098/realms/myrealm/account`
- You should see social buttons

## Make targets

- `make gen`: Generate `./data/import/myrealm-realm.json` from template + providers
- `make up`: Start Keycloak with import on port 8098
- `make logs`: Tail logs
- `make down`: Stop and remove the container

## Integration guidelines

Use these values in your app:

- Issuer: `http://localhost:8098/realms/myrealm`
- JWKS: `http://localhost:8098/realms/myrealm/protocol/openid-connect/certs`
- OAuth endpoints are discoverable via `/.well-known/openid-configuration`
- Client ID: `node-api-client`

### Node.js (Express + openid-client)

```js
const { Issuer } = require('openid-client');
const issuer = await Issuer.discover('http://localhost:8098/realms/myrealm');
const client = new issuer.Client({
  client_id: 'node-api-client',
  client_secret: '<secret>',
  redirect_uris: ['http://localhost:3000/oidc/callback'],
  response_types: ['code'],
  token_endpoint_auth_method: 'client_secret_post',
});
```

### SPA (OIDC Code Flow with PKCE)

- Use a library like `@azure/msal-browser`, `oidc-client-ts`, or Auth.js
- Configure authority/issuer: `http://localhost:8098/realms/myrealm`
- Use Code Flow with PKCE; configure redirect URI to your SPA URL

### Java (Spring Security)

- `spring.security.oauth2.client.provider.keycloak.issuer-uri=http://localhost:8098/realms/myrealm`
- `spring.security.oauth2.client.registration.keycloak.client-id=node-api-client`
- `spring.security.oauth2.client.registration.keycloak.client-secret=<secret>`

### .NET (ASP.NET Core)

- `options.Authority = "http://localhost:8098/realms/myrealm";`
- `options.ClientId = "node-api-client";`
- `options.ClientSecret = "<secret>";`
- `options.ResponseType = "code";`

### Next.js / Auth.js

- Provider: Keycloak
- `issuer` / `wellKnown`: `http://localhost:8098/realms/myrealm/.well-known/openid-configuration`
- `clientId` / `clientSecret`: from your Keycloak client

## Notes

- If you change the port, update redirect URIs and issuer across apps
- For consistent imports, keep `providers.json` out of version control
- To export changes you make in the UI, run the export command listed in the root README
