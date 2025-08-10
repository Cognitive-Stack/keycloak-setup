.[0] as $tmpl | .[1] as $prov
| $tmpl
| .realm = ($prov.realm // .realm)
| .clients |= ( map(
    if .clientId == ($prov.keycloak.clientId // .clientId) then
      .secret = ($prov.keycloak.clientSecret // .secret)
      | .redirectUris = ($prov.keycloak.redirectUris // .redirectUris)
    else . end
  ))
| .identityProviders |= ( map(
    if .alias == "google" then (
      .config.clientId = (if ($prov.google.clientId | tostring | length) > 0 then $prov.google.clientId else .config.clientId end)
      | .config.clientSecret = (if ($prov.google.clientSecret | tostring | length) > 0 then $prov.google.clientSecret else .config.clientSecret end)
    )
    elif .alias == "github" then (
      .config.clientId = (if ($prov.github.clientId | tostring | length) > 0 then $prov.github.clientId else .config.clientId end)
      | .config.clientSecret = (if ($prov.github.clientSecret | tostring | length) > 0 then $prov.github.clientSecret else .config.clientSecret end)
    )
    elif .alias == "microsoft" then (
      .config.clientId = (if ($prov.microsoft.clientId | tostring | length) > 0 then $prov.microsoft.clientId else .config.clientId end)
      | .config.clientSecret = (if ($prov.microsoft.clientSecret | tostring | length) > 0 then $prov.microsoft.clientSecret else .config.clientSecret end)
    )
    else . end
  ))
| (if (.identityProviders | any(.alias == "google") | not) and (($prov.google.clientId | tostring | length) > 0) then
    .identityProviders += [{
      alias: "google",
      displayName: "Google",
      providerId: "oidc",
      enabled: true,
      trustEmail: true,
      storeToken: true,
      firstBrokerLoginFlowAlias: "first broker login",
      config: {
        useJwksUrl: "true",
        clientId: $prov.google.clientId,
        clientSecret: $prov.google.clientSecret,
        authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth",
        tokenUrl: "https://oauth2.googleapis.com/token",
        jwksUrl: "https://www.googleapis.com/oauth2/v3/certs",
        userInfoUrl: "https://openidconnect.googleapis.com/v1/userinfo",
        issuer: "https://accounts.google.com",
        defaultScope: "openid email profile"
      }
    }] else . end)
| (if (.identityProviders | any(.alias == "github") | not) and (($prov.github.clientId | tostring | length) > 0) then
    .identityProviders += [{
      alias: "github",
      displayName: "GitHub",
      providerId: "github",
      enabled: true,
      trustEmail: true,
      storeToken: true,
      firstBrokerLoginFlowAlias: "first broker login",
      config: {
        clientId: $prov.github.clientId,
        clientSecret: $prov.github.clientSecret,
        defaultScope: "read:user user:email",
        baseUrl: "https://github.com",
        apiUrl: "https://api.github.com"
      }
    }] else . end)
| (if (.identityProviders | any(.alias == "microsoft") | not) and (($prov.microsoft.clientId | tostring | length) > 0) then
    .identityProviders += [{
      alias: "microsoft",
      displayName: "Microsoft",
      providerId: "oidc",
      enabled: true,
      trustEmail: true,
      storeToken: true,
      firstBrokerLoginFlowAlias: "first broker login",
      config: {
        useJwksUrl: "true",
        clientId: $prov.microsoft.clientId,
        clientSecret: $prov.microsoft.clientSecret,
        authorizationUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
        tokenUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
        jwksUrl: "https://login.microsoftonline.com/common/discovery/v2.0/keys",
        userInfoUrl: "https://graph.microsoft.com/oidc/userinfo",
        issuer: "https://login.microsoftonline.com/common/v2.0",
        defaultScope: "openid email profile"
      }
    }] else . end) 