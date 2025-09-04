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
  } catch {
    return next(new ApiError('Id precisa ser UUID.', 400));
  }
  const caso = repository.findById(id);
    if (!caso) {
      return next(new ApiError('Caso nao encontrado.', 404));
    }
  
    return res.status(200).json(caso);
};

export const createCase = (req, res, next) => {
  try {
    const data = caseSchema.parse(req.body);
    if (!agentesRepo.findById(data.agente_id)) {
      return next(new ApiError('Agente informado não existe.', 404));
    }
    const created = repository.create(data);
    return res.status(201).json(created);
  } catch (err) {
    if (err instanceof ZodError) return next(new ApiError('Parâmetros inválidos.', 400));
    return next(new ApiError('Erro ao criar o caso.'));
  }
};

export const updateCase = (req, res, next) => {
  try {
    const { id } = req.params;
    const data = caseSchema.parse(req.body);
    if (!agentesRepo.findById(data.agente_id)) {
      return next(new ApiError('Agente informado não existe.', 404));
    }
    const updated = repository.update(id, data);
    if (!updated) return next(new ApiError('Caso não encontrado.', 404));
    return res.status(200).json(updated);
  } catch (err) {
    if (err instanceof ZodError) {
      console.log(err)
      return next(new ApiError('Parâmetros inválidos.', 400));
    }
    return next(new ApiError('Erro ao atualizar o caso.'));
  }
};

export const patchCase = (req, res, next) => {
  let id;
  try {
    ({ id } = idSchema.parse(req.params));
  } catch {
    return next(new ApiError('Id precisa ser UUID.', 400));
  }
  const current = repository.findById(id);
  console.log(current);
  if (!current) return next(new ApiError("Caso não encontrado.", 404));
  try {
    const data = casePatchSchema.parse(req.body);
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