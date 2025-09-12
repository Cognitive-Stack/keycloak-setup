const FlowService = require('../services/flow');

class FlowController {
  async createFlow(req, res, next) {
    try {
      const { realmName } = req.params;
      const flowConfig = req.body;
      await FlowService.createFlow(realmName, flowConfig);
      res.status(201).json({
        status: 'success',
        message: `Authentication flow 'first-broker-login' applied successfully to realm '${realmName}'.`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FlowController();
