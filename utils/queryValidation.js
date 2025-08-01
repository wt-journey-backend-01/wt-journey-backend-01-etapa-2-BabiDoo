import z from 'zod';
export const querySchema = z.object({
  cargo: z.enum(['inspetor','delegado']).optional(),
  sort: z.enum(['dataDeIncorporacao','-dataDeIncorporacao']).optional(),
});