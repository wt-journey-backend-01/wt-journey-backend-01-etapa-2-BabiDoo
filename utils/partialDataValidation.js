import { agentSchema } from '../utils/agentValidation.js';
import { caseSchema } from '../utils/caseValidation.js';

const agentPatchSchema = agentSchema.partial();
const casePatchSchema = caseSchema.partial();

export { agentPatchSchema, casePatchSchema };

