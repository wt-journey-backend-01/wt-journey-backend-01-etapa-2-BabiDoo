import { z } from 'zod';

export const caseSchema = z.object({
  titulo: z
    .string({ required_error: 'O título do caso é obrigatório.' })
    .min(10, 'O título do caso não pode ser vazio.'),
  descricao: z
    .string({ required_error: 'A descrição do caso é obrigatória.' })
    .min(10, 'A descrição do caso não pode ser vazia.'),
  status: z.enum(['aberto', 'solucionado'], {
    required_error: 'O status do caso é obrigatório.',
    invalid_type_error: 'Status deve ser "aberto" ou "solucionado".',
  }),
  agente_id: z
    .string({ required_error: 'Uma autoridade responsável é obrigatória.' })
    .uuid('agente_id deve ser um uuid válido.'),
});
