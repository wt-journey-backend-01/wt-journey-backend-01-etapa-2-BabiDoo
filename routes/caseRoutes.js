import { express } from 'express';
import * as controller from '../controllers/caseController.js';

const router = express.Router();

router.get('/', controller.getAllCases);
router.get('/:id', controller.getCaseById);
router.post('/', controller.createCase);
router.put('/:id', controller.updateCase);
router.patch('/:id', controller.patchCase);
router.delete('/:id', controller.deleteCase);

export { router as caseRouter };