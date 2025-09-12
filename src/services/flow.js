const KeycloakService = require('./keycloak');

class FlowService {
  createFlow(realm, flowConfig) {
    console.log(`Creating flow for realm ${realm} with config`, flowConfig);

    const flowJson = {
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

    KeycloakService.createFlow(realm, flowJson);
    return flowJson;
  }
}

module.exports = new FlowService();
