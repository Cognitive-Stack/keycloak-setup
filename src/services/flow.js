const KeycloakService = require('./keycloak');

// Placeholder for flow-related business logic
class FlowService {
  createFlow(realm, flowConfig) {
    console.log(`Creating flow for realm ${realm} with config`, flowConfig);
    // In a future story, this will generate the real JSON
    const flowJson = { alias: 'first-broker-login', executions: [] };
    return KeycloakService.createFlow(realm, flowJson);
  }
}

module.exports = new FlowService();
