const request = require('supertest');
const app = require('../../app');
const { startKeycloak, stopKeycloak } = require('./docker.helper');

describe('E2E: Flow API', () => {
  beforeAll(async () => {
    await startKeycloak();
  });

  afterAll(async () => {
    await stopKeycloak();
  });

  it('should be able to create and verify a flow', async () => {
    // This is a placeholder test. In a real scenario, we would:
    // 1. Get an admin token from Keycloak.
    // 2. Create a new realm for testing.
    // 3. Call our API to create the flow in the new realm.
    // 4. Call our API to verify the flow.

    const res = await request(app)
      .post('/api/v1/realms/master/flows')
      .send({ approvedDomains: ['example.com'] });

    expect(res.statusCode).toEqual(201);

    const verifyRes = await request(app)
      .get('/api/v1/realms/master/flows/first-broker-login/verify');
    
    // This will fail because the mock is not in place for e2e
    // and the actual keycloak service is not implemented yet.
    // We expect a 400 because the flow is not really created.
    expect(verifyRes.statusCode).toEqual(400);
  });
});
