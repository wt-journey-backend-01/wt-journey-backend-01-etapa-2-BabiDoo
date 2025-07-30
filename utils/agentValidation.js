import z from 'zod';

const agentSchema = z.object({
    name: z.string({ require_error: 'Nome é obrigatório.', invalid_type_error: 'Use apenas letras.'}).min(1, 'Nome não pode ser vazio.'),
    incorporationDate: z.string({ required_error: 'A data de incorporação é obrigatória.' }).refine(val => /^\d{4}-\d{2}-\d{2}$/.test(val), {
      message: 'A data deve estar no formato YYYY-MM-DD.',
    }).refine(val => !isNaN(Date.parse(val)), {
      message: 'A data deve estar no formato YYYY-MM-DD.',
    }).transform(val => new Date(val)),
    position: z.string({ require_error: 'O cargo é obrigatório.', invalid_type_error: 'Use apenas letras.'}).min(1, 'O cargo não pode ser vazio')
})

export { agentSchema };