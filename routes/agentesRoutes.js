import express from 'express';
import * as controller from '../controllers/agentesController.js';
import { requireUuidParam } from '../utils/requireUuidParam.js';

const agentRouter = express.Router();

agentRouter.get('/', controller.getAllAgents);
agentRouter.get('/:id', requireUuidParam('id'), controller.getAgentById);
agentRouter.post('/', controller.createAgent);
agentRouter.put('/:id', requireUuidParam('id'), controller.updateAgent);
agentRouter.patch('/:id', requireUuidParam('id'), controller.patchAgent);
agentRouter.delete('/:id', requireUuidParam('id'), controller.deleteAgent);

export default agentRouter;