const FlowService = require('../flow');
const KeycloakService = require('../keycloak');

jest.mock('../keycloak', () => ({
  createFlow: jest.fn().mockResolvedValue({ success: true }),
}));

describe('FlowService', () => {
  describe('createFlow', () => {
    it('should generate a valid first broker login flow with profile completeness', () => {
      FlowService.createFlow('test-realm', {});
      
      const expectedFlow = {
        alias: 'first-broker-login',
        providerId: 'basic-flow',
        topLevel: true,
        description: 'This flow is triggered after a user logs in for the first time with an identity provider.',
        executions: [
          {
            requirement: 'REQUIRED',
            providerId: 'identity-provider-review-profile',
            priority: 10,
          },
        ],
      };

      expect(KeycloakService.createFlow).toHaveBeenCalledWith('test-realm', expectedFlow);
    });
  });
});
