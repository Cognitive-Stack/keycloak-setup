const request = require('supertest');
const app = require('../../app');
const FlowService = require('../../src/services/flow');

jest.mock('../../src/services/flow.js');

describe('POST /api/v1/realms/:realmName/flows', () => {
  it('should return 201 Created and the flow JSON on success', async () => {
    const mockFlow = {
      alias: 'first-broker-login',
      executions: [{ requirement: 'REQUIRED', providerId: 'identity-provider-review-profile' }],
    };
    FlowService.createFlow.mockResolvedValue(mockFlow);

    const res = await request(app)
      .post('/api/v1/realms/test-realm/flows')
      .send({ flowType: 'first-broker-login' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(mockFlow);
  });
});
