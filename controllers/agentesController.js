import * as repository from '../repositories/agentesRepository.js';
import { agentSchema } from '../utils/agentValidation.js';
import { agentPatchSchema } from '../utils/partialDataValidation.js';
import { ZodError } from 'zod';

class ApiError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

export const getAllAgents = (req, res, next) => {
  try {
    const agents = repository.findAll();
    return res.status(200).json(agents);
    } catch (err) {
    if (err instanceof ZodError) return next(new ApiError('Parâmetros de consulta inválidos.', 400));
    return next(new ApiError('Não foi possível listar os agentes.'));
  }
};

export const getAgentById = (req, res, next) => {
  try {
    const { id } = req.params;
    const agent = repository.findById(id);
    if (!agent) return next(new ApiError('Agente não encontrado.', 404));
    return res.status(200).json(agent);
  } catch {
    return next(new ApiError('Erro ao buscar o agente.'));
  }
};

export const createAgent = (req, res, next) => {
  try {
    const data = agentSchema.parse(req.body);
    const created = repository.create(data);
    return res.status(201).json(created);
  } catch (err) {
    if (err instanceof ZodError) return next(new ApiError('Parâmetros inválidos.', 400));
    return next(new ApiError('Erro ao criar o agente.'));
  }
};

export const updateAgent = (req, res, next) => {
  try {
    const { id } = req.params;
    const data = agentSchema.parse(req.body);
    const updated = repository.update(id, data);
    if (!updated) return next(new ApiError('Agente não encontrado.', 404));
    return res.status(200).json(updated);
  } catch (err) {
    if (err instanceof ZodError) return next(new ApiError('Parâmetros inválidos.', 400));
    return next(new ApiError('Erro ao atualizar o agente.'));
  }
};

export const patchAgent = (req, res, next) => {
  try {
    const { id } = req.params;
    const partial = agentPatchSchema.parse(req.body);
    const patched = repository.patch(id, partial);
    if (!patched) return next(new ApiError('Agente não encontrado.', 404));
    return res.status(200).json(patched);
  } catch (err) {
    if (err instanceof ZodError) return next(new ApiError('Parâmetros inválidos.', 400));
    return next(new ApiError('Erro ao atualizar o agente.'));
  }
};

export const deleteAgent = (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = repository.remove(id);
    if (!deleted) return next(new ApiError('Agente não encontrado.', 404));
    return res.sendStatus(204);
  } catch {
    return next(new ApiError('Erro ao deletar agente.'));
  }
};
