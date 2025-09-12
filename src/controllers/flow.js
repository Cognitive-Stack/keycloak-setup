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

  async verifyFlow(req, res, next) {
    try {
      const { realmName, flowAlias } = req.params;
      const result = await FlowService.verifyFlow(realmName, flowAlias);
      if (result.success) {
        res.status(200).json({ status: 'success', message: result.message });
      } else {
        res.status(400).json({ status: 'error', message: result.message });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FlowController();
