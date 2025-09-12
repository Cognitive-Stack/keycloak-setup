const request = require('supertest');
const app = require('../../app');
const FlowService = require('../../src/services/flow');

jest.mock('../../src/services/flow.js');

describe('Flow API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/v1/realms/:realmName/flows', () => {
    it('should call createFlow and return 201', async () => {
      const mockFlow = { alias: 'first-broker-login', executions: [] };
      FlowService.createFlow.mockResolvedValue(mockFlow);

      const res = await request(app)
        .post('/api/v1/realms/test-realm/flows')
        .send({ approvedDomains: ['example.com'] });

      expect(FlowService.createFlow).toHaveBeenCalledWith('test-realm', { approvedDomains: ['example.com'] });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual(mockFlow);
    });
  });

  describe('GET /api/v1/realms/:realmName/flows/:flowAlias/verify', () => {
    it('should return 200 on successful verification', async () => {
      FlowService.verifyFlow.mockResolvedValue({ success: true, message: 'Flow is valid.' });

      const res = await request(app)
        .get('/api/v1/realms/test-realm/flows/first-broker-login/verify');

      expect(FlowService.verifyFlow).toHaveBeenCalledWith('test-realm', 'first-broker-login');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ status: 'success', message: 'Flow is valid.' });
    });

    it('should return 400 on failed verification', async () => {
      FlowService.verifyFlow.mockResolvedValue({ success: false, message: 'Flow is missing executions.' });

      const res = await request(app)
        .get('/api/v1/realms/test-realm/flows/first-broker-login/verify');

      expect(FlowService.verifyFlow).toHaveBeenCalledWith('test-realm', 'first-broker-login');
      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual({ status: 'error', message: 'Flow is missing executions.' });
    });
  });
});
