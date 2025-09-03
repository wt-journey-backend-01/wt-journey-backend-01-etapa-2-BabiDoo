import { z } from 'zod';

export const agentSchema = z
.object({
  nome: z.string({ required_error: 'Nome é obrigatório.' })
    .regex(/^[\p{L}\s.'-]+$/u, 'Use apenas letras.'),
  dataDeIncorporacao: z
    .string({ required_error: 'A data de incorporação é obrigatória.' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'A data deve estar no formato YYYY-MM-DD.'),
  cargo: z.string({ required_error: 'Cargo é obrigatório.' })
}).strict();


export const agentPatchValidation = z
.object({
  nome: z.string({ required_error: 'Nome é obrigatório.' })
    .regex(/^[\p{L}\s.'-]+$/u, 'Use apenas letras.'),
  dataDeIncorporacao: z
    .string({ required_error: 'A data de incorporação é obrigatória.' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'A data deve estar no formato YYYY-MM-DD.'),
  cargo: z.enum(['Inspetor', 'Delegado'], {
    required_error: 'O cargo é obrigatório.',
    invalid_type_error: 'O cargo deve ser "inspetor" ou "delegado".',
  }),
  id: z.uuid()
}).strict();
