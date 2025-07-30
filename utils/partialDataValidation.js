import { agentSchema } from '../utils/agentValidation.js';
import { caseSchema } from '../utils/caseValidation.js';

const agentPatchSchema = agentSchema.partial();
const casePathSchema = caseSchema.partial();

export { agentPatchSchema, casePathSchema };

