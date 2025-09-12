const express = require('express');
const FlowController = require('../controllers/flow');

const router = express.Router();

router.post('/realms/:realmName/flows', FlowController.createFlow);

module.exports = router;
