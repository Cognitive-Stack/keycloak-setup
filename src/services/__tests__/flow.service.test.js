const FlowService = require('../flow');
const KeycloakService = require('../keycloak');

jest.mock('../keycloak', () => ({
  createFlow: jest.fn().mockResolvedValue({ success: true }),
}));

describe('FlowService', () => {
  describe('createFlow', () => {
    it('should generate a valid flow with account linking, domain validation, and profile completeness', () => {
      FlowService.createFlow('test-realm', {});

      const domainValidationScript = `
var AuthenticationFlowError = Java.type("org.keycloak.authentication.AuthenticationFlowError");
var LOG = Java.type("org.jboss.logging.Logger").getLogger("io.phasetwo.keycloak.authentication");

function authenticate(context) {
    var approvedDomains = ['example.com'];
    var email = user.getEmail();
    if (!email) {
        LOG.errorf("User %s has no email, failing authentication", user.getUsername());
        context.failure(AuthenticationFlowError.INVALID_USER);
        return;
    }

    var domain = email.substring(email.lastIndexOf("@") + 1);
    if (approvedDomains.indexOf(domain) >= 0) {
        context.success();
    } else {
        LOG.errorf("User %s email domain %s is not in the approved list, failing authentication", user.getUsername(), domain);
        context.failure(AuthenticationFlowError.INVALID_CREDENTIALS);
    }
}
`;
      
      const expectedFlow = {
        alias: 'first-broker-login',
        providerId: 'basic-flow',
        topLevel: true,
        description: 'This flow is triggered after a user logs in for the first time with an identity provider.',
        executions: [
          {
            requirement: 'ALTERNATIVE',
            providerId: 'idp-auto-link',
            priority: 10,
          },
          {
            requirement: 'REQUIRED',
            providerId: 'auth-script-execution',
            priority: 15,
            authenticationConfig: {
              alias: 'Domain Validator',
              config: {
                'script.code': domainValidationScript,
              },
            },
          },
          {
            requirement: 'REQUIRED',
            providerId: 'identity-provider-review-profile',
            priority: 20,
          },
        ],
      };

      expect(KeycloakService.createFlow).toHaveBeenCalledWith('test-realm', expectedFlow);
    });
  });
});
