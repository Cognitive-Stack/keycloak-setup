const FlowService = require('../services/flow');

class FlowController {
  async createFlow(req, res, next) {
    try {
      const { realmName } = req.params;
      const flowConfig = req.body;
      const flowJson = await FlowService.createFlow(realmName, flowConfig);
      res.status(201).json(flowJson);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FlowController();
