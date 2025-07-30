import { agentesSchema } from './agentesValidation.js';
import { casosSchema } from './casosValidation.js';

const agentesPatchSchema = agentesSchema.partial();
const casosPatchSchema = casosSchema.partial();

export { agentesPatchSchema, casosPatchSchema };