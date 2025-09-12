const request = require('supertest');
const app = require('../../app');

// The actual service is being tested, so we don't mock it.
// We do, however, need to mock the KeycloakService dependency.
jest.mock('../../src/services/keycloak.js', () => ({
  createFlow: jest.fn().mockResolvedValue({ success: true }),
}));

describe('POST /api/v1/realms/:realmName/flows', () => {
  it('should return a flow without domain validation when no domains are provided', async () => {
    const res = await request(app)
      .post('/api/v1/realms/test-realm/flows')
      .send({});

    expect(res.statusCode).toEqual(201);
    expect(res.body.executions).toHaveLength(2);
    expect(res.body.executions.map(e => e.providerId)).toEqual([
      'idp-auto-link',
      'identity-provider-review-profile',
    ]);
  });

  it('should return a flow with domain validation when domains are provided', async () => {
    const approvedDomains = ['example.com'];
    const res = await request(app)
      .post('/api/v1/realms/test-realm/flows')
      .send({ approvedDomains });

    expect(res.statusCode).toEqual(201);
    expect(res.body.executions).toHaveLength(3);
    expect(res.body.executions.map(e => e.providerId)).toEqual([
      'idp-auto-link',
      'auth-script-execution',
      'identity-provider-review-profile',
    ]);
  });
});
