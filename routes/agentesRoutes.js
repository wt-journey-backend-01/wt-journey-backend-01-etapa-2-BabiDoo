import express from 'express';
import * as controller from '../controllers/agentesController.js';

const agentesRouter = express.Router();

agentesRouter.get('/', controller.getAllAgents);
agentesRouter.get('/:id', controller.getAgentById);
agentesRouter.post('/', controller.createAgent);
agentesRouter.put('/:id', controller.updateAgent);
agentesRouter.patch('/:id', controller.patchAgent);
agentesRouter.delete('/:id', controller.deleteAgent);

export default agentesRouter;