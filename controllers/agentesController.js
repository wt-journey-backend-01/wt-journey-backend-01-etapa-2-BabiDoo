import * as repository from '../repositories/agentesRepository.js';
import { agentesSchema } from '../utils/agentesValidation.js';
import { agentesPatchSchema } from '../utils/dadosParciaisValidation.js';
import { idSchema } from '../utils/idValidation.js';
import { v4 as uuidv4 } from 'uuid';
import { z, ZodError } from 'zod';
class ApiError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
    }
}

const getAllAgents = (req, res, next) => {
    try {
        const agents  = repository.findAll();
        res.status(200).json(agents)
    } catch (err) {
        return next( new ApiError ('Não foi possível listar os agentes.', 500));
    }
};

const getAgentById = (req, res, next) => {
  try {
    const id = idSchema.parse(req.params.id);
    const agent = repository.findById(id);
    if (!agent) return next(new ApiError('Agente não encontrado.', 404));
    res.status(200).json(agent);
  } catch (err) {
    if (err instanceof ZodError) {
      return next(new ApiError(err.message, 400));
    }
    next(new ApiError('Erro ao buscar agente: ' + err.message, 500));
}
};

const createAgent = (req, res, next) => {
    try {
        const data = agentesSchema.parse(req.body);
        const newAgent = {
            id: uuidv4(),
            ...data
        };
        const agent = repository.create(newAgent);
        res.status(201).json(agent);
    } catch (err) {
        if (err instanceof z.ZodError) {
        return next(new ApiError('Não foi possível criar um agente.', 400));
      } 
        return next(new ApiError(err.message, 500));
    }
};

const updateAgent = (req, res, next) => {
    try {
        const id = idSchema.parse(req.params.id);
        const data = agentesSchema.parse(req.body);
        const updated = repository.update(id, data);
        if (!updated) return next(new ApiError('Agente não encontrado.', 404));
        res.status(200).json(updated);
    } catch (err) {
    if (err instanceof ZodError) {
      return next(new ApiError(err.message, 400));
    }
    next(new ApiError('Erro ao atualizar agente: ' + err.message, 500));
  }
};

const patchAgent = (req, res, next) => {
  try {
    const id = idSchema.parse(req.params.id);
    const partialData = agentesPatchSchema.parse(req.body);
    const updated = repository.patch(id, partialData);
    if (!updated) return next(new ApiError('Agente não encontrado.', 404));
    res.status(200).json(updated);
  } catch (err) {
    if (err instanceof ZodError) {
      return next(new ApiError(err.message, 400));
    }
    return next(new ApiError('Erro ao atualizar parcialmente o agente.', 500));
  }
};


const deleteAgent = (req, res, next) => {
    try {
        const id = idSchema.parse(req.params.id);
        const deleted = repository.remove(id);
        if (!deleted) return next(new ApiError('Agente não encontrado.', 404));
        res.sendStatus(204);
    } catch (err) {
    if (err instanceof ZodError) {
      return next(new ApiError(err.message, 400));
    }
    return next(new ApiError('Erro ao deletar o agente.', 500));
  }
};

export { getAllAgents, getAgentById, createAgent, updateAgent, patchAgent, deleteAgent };