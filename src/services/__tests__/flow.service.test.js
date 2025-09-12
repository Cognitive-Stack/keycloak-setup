const FlowService = require('../flow');
const KeycloakService = require('../keycloak');

jest.mock('../keycloak');

describe('FlowService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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

  describe('verifyFlow', () => {
    it('should return success if all required executions are present', async () => {
      const mockExecutions = [
        { providerId: 'idp-auto-link' },
        { providerId: 'identity-provider-review-profile' },
      ];
      KeycloakService.getFlowExecutions.mockResolvedValue(mockExecutions);

      const result = await FlowService.verifyFlow('test-realm', 'first-broker-login');

      expect(result.success).toBe(true);
      expect(result.message).toBe('Flow is valid.');
    });

    it('should return failure if required executions are missing', async () => {
      const mockExecutions = [
        { providerId: 'idp-auto-link' },
      ];
      KeycloakService.getFlowExecutions.mockResolvedValue(mockExecutions);

      const result = await FlowService.verifyFlow('test-realm', 'first-broker-login');

      expect(result.success).toBe(false);
      expect(result.message).toContain('missing required executions: identity-provider-review-profile');
    });

    it('should return failure if the flow is not found', async () => {
      KeycloakService.getFlowExecutions.mockResolvedValue(null);

      const result = await FlowService.verifyFlow('test-realm', 'non-existent-flow');

      expect(result.success).toBe(false);
      expect(result.message).toContain('not found');
    });
  });
});
