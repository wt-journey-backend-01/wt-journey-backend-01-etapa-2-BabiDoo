import * as repository from '../repositories/agentesRepository.js';
import { agentesSchema } from '../utils/agentesValidation.js';
import { agentesPatchSchema } from '../utils/dadosParciaisValidation.js';
import { v4 as uuidv4 } from 'uuid';
import { z, ZodError } from 'zod';
const idSchema = z.string().uuid();
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
    } catch (error) {
        next( new ApiError ('Não foi possível listar os agentes.', 500));
    }
};

const getAgentById = (req, res, next) => {
  try {
    const id = idSchema.parse(req.params.id);
    const agent = repository.findById(id);
    if (!agent) return next(new ApiError('Agente não encontrado.', 404));
    res.status(200).json(agent);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new ApiError('ID inválido, deve ser UUID.', 400));}
    }
    next(new ApiError(error.message, 500));
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
    } catch (error) {
        if (error instanceof z.ZodError) {
        return next(new ApiError('Não foi possível criar um agente.', 400));} 
    }
    next(new ApiError(error.message, 500));
};

const updateAgent = (req, res, next) => {
    try {
        const id = idSchema.parse(req.params.id);
        const data = agentesSchema.parse(req.body);
        const updated = repository.update(id, data);
        if (!updated) return next(new ApiError('Agente não encontrado.', 404));
        res.status(200).json(updated);
    } catch (error) {
    if (error instanceof ZodError) {
      return next(new ApiError(error.message, 400));
    }
    next(new ApiError('Erro ao atualizar o agente.', 500));
  }
};

const patchAgent = (req, res, next) => {
  try {
    const id = idSchema.parse(req.params.id);
    const partialData = agentesPatchSchema.parse(req.body);
    const updated = repository.patch(id, partialData);
    if (!updated) return next(new ApiError('Agente não encontrado.', 404));
    res.status(200).json(updated);
  } catch (error) {
    if (error instanceof ZodError) {
      return next(new ApiError(error.message, 400));
    }
    next(new ApiError('Erro ao atualizar parcialmente o agente.', 500));
  }
};


const deleteAgent = (req, res, next) => {
    try {
        const id = idSchema.parse(req.params.id);
        const deleted = repository.remove(id);
        if (!deleted) return next(new ApiError('Agente não encontrado.', 404));
        res.sendStatus(204);
    } catch (error) {
    if (error instanceof ZodError) {
      return next(new ApiError(error.message, 400));
    }
    next(new ApiError('Erro ao deletar o agente.', 500));
  }
};

export { getAllAgents, getAgentById, createAgent, updateAgent, patchAgent, deleteAgent };