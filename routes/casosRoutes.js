import express from 'express';
import * as controller from '../controllers/casosController.js';

const casosRouter = express.Router();

casosRouter.get('/', controller.getAllCases);
casosRouter.get('/:id', controller.getCaseById);
casosRouter.post('/', controller.createCase);
casosRouter.put('/:id', controller.updateCase);
casosRouter.patch('/:id', controller.patchCase);
casosRouter.delete('/:id', controller.deleteCase);

export default casosRouter;