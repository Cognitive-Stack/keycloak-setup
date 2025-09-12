const express = require('express');
const FlowController = require('../controllers/flow');

const router = express.Router();

/**
 * @swagger
 * /realms/{realmName}/flows:
 *   post:
 *     summary: Create or update the first-broker-login flow in a realm.
 *     tags: [Flows]
 *     parameters:
 *       - in: path
 *         name: realmName
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the realm.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               approvedDomains:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: A list of email domains to approve for the domain validation script.
 *     responses:
 *       201: 
 *         description: The generated flow JSON object.
 *       500:
 *         description: Server error.
 */
router.post('/realms/:realmName/flows', FlowController.createFlow);

/**
 * @swagger
 * /realms/{realmName}/flows/{flowAlias}/verify:
 *   get:
 *     summary: Verify that a flow has been deployed correctly.
 *     tags: [Flows]
 *     parameters:
 *       - in: path
 *         name: realmName
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the realm.
 *       - in: path
 *         name: flowAlias
 *         schema:
 *           type: string
 *         required: true
 *         description: The alias of the flow to verify.
 *     responses:
 *       200:
 *         description: The flow is valid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Flow is valid.
 *       400:
 *         description: The flow is invalid or not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: "Flow 'first-broker-login' is missing required executions: idp-auto-link"
 *       500:
 *         description: Server error.
 */
router.get('/realms/:realmName/flows/:flowAlias/verify', FlowController.verifyFlow);

/**
 * @swagger
 * tags:
 *   name: Flows
 *   description: API for managing Keycloak authentication flows.
 */

module.exports = router;
