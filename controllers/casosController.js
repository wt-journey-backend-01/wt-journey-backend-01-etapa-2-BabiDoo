import * as repository from '../repositories/casosRepository.js';
import * as agentesRepo from '../repositories/agentesRepository.js';
import { caseSchema } from '../utils/caseValidation.js';
import { casePatchSchema } from '../utils/partialDataValidation.js';
import { ZodError } from 'zod';

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
  try {
    const { id } = req.params;
    const found = repository.findById(id);
    if (!found) return next(new ApiError('Caso não encontrado.', 404));
    return res.status(200).json(found);
  } catch {
    return next(new ApiError('Erro ao buscar o caso.'));
  }
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
  try {
    const { id } = req.params;
    const partial = casePatchSchema.parse(req.body);
    if (partial.agente_id && !agentesRepo.findById(partial.agente_id)) {
      return next(new ApiError('Agente informado não existe.', 404));
    }
    const patched = repository.patch(id, partial);
    if (!patched) return next(new ApiError('Caso não encontrado.', 404));
    return res.status(200).json(patched);
  } catch (err) {
    if (err instanceof ZodError) return next(new ApiError('Parâmetros inválidos.', 400));
    return next(new ApiError('Erro ao atualizar o caso.'));
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