import express from 'express';
import * as controller from '../controllers/casosController.js';
import { requireUuidParam } from '../utils/requireUuidParam.js';

const caseRouter = express.Router();

caseRouter.get('/', controller.getAllCases);
caseRouter.get('/:id', requireUuidParam('id'), controller.getCaseById);
caseRouter.post('/', controller.createCase);
caseRouter.put('/:id', requireUuidParam('id'), controller.updateCase);
caseRouter.patch('/:id', requireUuidParam('id'), controller.patchCase);
caseRouter.delete('/:id', requireUuidParam('id'), controller.deleteCase);

export default caseRouter;