const request = require('supertest');
const app = require('../../app');

jest.mock('../../src/services/flow.js', () => ({
  createFlow: jest.fn().mockResolvedValue({ success: true }),
}));

describe('POST /api/v1/realms/:realmName/flows', () => {
  it('should return 201 Created on success', async () => {
    const res = await request(app)
      .post('/api/v1/realms/test-realm/flows')
      .send({ flowType: 'first-broker-login' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      status: 'success',
      message: "Authentication flow 'first-broker-login' applied successfully to realm 'test-realm'.",
    });
  });
});
