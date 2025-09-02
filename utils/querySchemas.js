import { z } from 'zod';

export const agentesQuerySchema = z.object({
  sort: z.enum(['dataDeIncorporacao', '-dataDeIncorporacao']).optional(),
});

export const casosQuerySchema = z.object({
  status: z.enum(['aberto', 'solucionado']).optional(),
  agente_id: z.string().uuid('agente_id deve ser um uuid válido.').optional(),
  q: z.string().min(1).optional(),
});