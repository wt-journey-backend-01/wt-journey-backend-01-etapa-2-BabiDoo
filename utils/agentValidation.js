import { z } from 'zod';

export const agentSchema = z
.object({
  nome: z.string({ required_error: 'Nome é obrigatório.' })
    .min(1, 'Nome não pode ser vazio.')
    .regex(/^[\p{L}\s.'-]+$/u, 'Use apenas letras.'),
  dataDeIncorporacao: z
    .string({ required_error: 'A data de incorporação é obrigatória.' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'A data deve estar no formato YYYY-MM-DD.'),
  cargo: z.enum(['inspetor', 'delegado'], {
    required_error: 'O cargo é obrigatório.',
    invalid_type_error: 'O cargo deve ser "inspetor" ou "delegado".',
  })
}).strict();
