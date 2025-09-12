const FlowService = require('../flow');
const KeycloakService = require('../keycloak');

jest.mock('../keycloak', () => ({
  createFlow: jest.fn().mockResolvedValue({ success: true }),
}));

describe('FlowService', () => {
  beforeEach(() => {
    KeycloakService.createFlow.mockClear();
  });

  describe('createFlow', () => {
    it('should generate a flow without domain validation if no domains are provided', () => {
      FlowService.createFlow('test-realm', {});
      
      const expectedExecutions = [
        { requirement: 'ALTERNATIVE', providerId: 'idp-auto-link', priority: 10 },
        { requirement: 'REQUIRED', providerId: 'identity-provider-review-profile', priority: 20 },
      ];

      const call = KeycloakService.createFlow.mock.calls[0];
      expect(call[0]).toBe('test-realm');
      expect(call[1].executions).toEqual(expectedExecutions);
    });

    it('should generate a flow with domain validation if domains are provided', () => {
      const approvedDomains = ['example.com', 'test.com'];
      FlowService.createFlow('test-realm', { approvedDomains });

      const scriptExecution = expect.objectContaining({
        requirement: 'REQUIRED',
        providerId: 'auth-script-execution',
        priority: 15,
      });

      const call = KeycloakService.createFlow.mock.calls[0];
      expect(call[0]).toBe('test-realm');
      expect(call[1].executions).toHaveLength(3);
      expect(call[1].executions).toContainEqual(scriptExecution);

      // Check that the domains are correctly embedded in the script
      const generatedScript = call[1].executions[1].authenticationConfig.config['script.code'];
      expect(generatedScript).toContain(`var approvedDomains = ["example.com","test.com"];`);
    });
  });
});
