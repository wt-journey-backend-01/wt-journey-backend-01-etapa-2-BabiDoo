import z from 'zod';

const caseSchema = z.object ({
    titulo: z.string({ require_error: 'O título do caso é obrigatório.'}).min(10, 'O título do caso não pode ser vazio.'),
    descricao: z.string({ require_error: 'A descrição do caso é obrigatória.'}).min(10, 'O título do caso não pode ser vazio.'),
    status: z.enum(['aberto', 'solucionado'], {
        required_error: 'O status do caso é obrigatório.',
        invalid_type_error: 'Status deve ser "aberto" ou "solucionado".',

    }),
    agenteId: z.uuid({ require_error: 'Uma autoridade responsável é obrigatório.'})

})

export { caseSchema };
