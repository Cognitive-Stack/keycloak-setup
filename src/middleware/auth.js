const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const auth = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.KEYCLOAK_ISSUER_URL}/protocol/openid-connect/certs`,
  }),
  audience: process.env.KEYCLOAK_AUDIENCE,
  issuer: process.env.KEYCLOAK_ISSUER_URL,
  algorithms: ['RS256'],
});

module.exports = auth;
