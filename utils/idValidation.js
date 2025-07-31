import { z } from 'zod';

const idSchema = z
  .string({ required_error: 'Parâmetro id é obrigatório' })
  .uuid({ message: 'ID inválido, deve ser um UUID' });



export { idSchema };