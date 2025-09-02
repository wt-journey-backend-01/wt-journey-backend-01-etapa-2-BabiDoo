import express from 'express';
import * as controller from '../controllers/agentesController.js';

const agentRouter = express.Router();

agentRouter.get('/', controller.getAllAgents);
agentRouter.get('/:id', controller.getAgentById);
agentRouter.post('/', controller.createAgent);
agentRouter.put('/:id', controller.updateAgent);
agentRouter.patch('/:id', controller.patchAgent);
agentRouter.delete('/:id', controller.deleteAgent);

export default agentRouter;