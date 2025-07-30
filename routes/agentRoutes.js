import express from 'express';
import * as controller from '../controllers/agentController.js';

const router = express.Router();

router.get('/', controller.getAllAgents);
router.get('/:id', controller.getAgentById);
router.post('/', controller.createAgent);
router.put('/:id', controller.updateAgent);
router.patch('/:id', controller.patchAgent);
router.delete('/:id', controller.deleteAgent);

export { router as agentRouter };