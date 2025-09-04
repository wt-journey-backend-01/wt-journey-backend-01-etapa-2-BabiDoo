import * as repository from '../repositories/casosRepository.js';
import * as agentesRepo from '../repositories/agentesRepository.js';
import { caseSchema } from '../utils/caseValidation.js';
import { casePatchSchema } from '../utils/partialDataValidation.js';
import { ZodError, z } from 'zod';

const idSchema = z.object({ id: z.uuid() });

class ApiError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

export const getAllCases = (req, res, next) => {
  try {
    const cases = repository.findAll();
    return res.status(200).json(cases);
    } catch (err) {
    if (err instanceof ZodError) return next(new ApiError('Parâmetros de consulta inválidos.', 400));
    return next(new ApiError('Não foi possível listar os casos'));
  }
};

export const getCaseById = (req, res, next) => {
  let id;
  try {
    ({ id } = idSchema.parse(req.params));
  } catch (err) {
    return next(new ApiError("Id precisa ser UUID.", 404));
  }

  const caso = repository.findById(id);
  if (!caso) {
    return next(new ApiError('Agente não encontrado.', 404));
  }

  return res.status(200).json(caso);
};


export const createCase = (req, res, next) => {
  console.log("Tenta criar: ", req.body);
  console.log("Params de: ", req.params.id);
  try {
    const { agente_id } = z.object({ agente_id: z.uuid() }).parse(req.body);
    const agent = agentesRepo.findById(agente_id);
    if (!agent) return next(new ApiError("Agente não encontrado.", 404));

    const data = caseSchema.parse(req.body);
    const created = repository.create(data, agente_id );
    return res.status(201).json(created);

  } catch (err) {
    console.log(err)
    if (err instanceof ZodError) {
      return next(new ApiError("Parâmetros inválidos.", 400));

    }
    console.log(err)
    return next(new ApiError("Erro ao criar o caso.", 500));
  }
};


export const updateCase = (req, res, next) => {
  let id;
  try { 
    ({ id } = idSchema.parse(req.params));
  } catch (err) {
    return next(new ApiError('Id precisa ser UUID.', 400));
  }
  try {
    const dados = caseSchema.parse(req.body);
    const agente = agentesRepo.findById(dados.agente_id);
    if (!agente) {
      return next(new ApiError('Agente não existe.', 404));
    }
    const current = repository.findById(id);
  if(!current) return next(new ApiError("Caso não encontrado.", 404));
    const casoAtualizado = repository.update(id, dados);
    return res.status(200).json(casoAtualizado);
  } catch (err) {
    if (err instanceof ZodError) {
      console.log(err);
      return next(new ApiError("Parâmetros inválidos.", 400));
    }
    console.log(err);
    return next(new ApiError("Erro ao atualizar o caso."));
  }
  };

export const patchCase = (req, res, next) => {
  let id;
  try {
    ({ id } = idSchema.parse(req.params));
  } catch (err){
    return next(new ApiError('Id precisa ser UUID.', 400));
  }
  try {
    const data = casePatchSchema.parse(req.body);
    const current = repository.findById(id);
    if (!current) return next(new ApiError("Caso não encontrado.", 404));
    const updated = { ...current, ...data };
    console.log('patching case')
    repository.patch(id, updated);
    console.log('patched: ', updated);
    return res.status(200).json(updated);
  } catch (err) {
    if (err instanceof ZodError) {
      console.log(err);
      return next(new ApiError("Parâmetros inválidos.", 400));
    }
    console.log(err);
    return next(new ApiError("Erro ao atualizar o caso."));
  }
};

export const deleteCase = (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = repository.remove(id);
    if (!deleted) return next(new ApiError('Caso não encontrado.', 404));
    return res.sendStatus(204);
  } catch {
    return next(new ApiError('Erro ao deletar o caso.'));
  }
};