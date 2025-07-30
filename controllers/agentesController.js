import * as repository from '../repositories/agentesRepository.js';
import { agentesSchema } from '../utils/agentesValidation.js';
import { agentPatchSchema } from '../utils/dadosParciaisValidation.js';
import { v4 as uuidv4 } from 'uuid';

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
        next( new ApiError ('Não foi possível listar os agentes'));
    }
};

const getAgentById = (req, res, next) => {
  const { id } = req.params;
  try {
    const agent = repository.findById(id);
    if (!agent) return next(new ApiError('Agente não encontrado.', 404));
    res.status(200).json(agent);
  } catch (error) {
    next(new ApiError(error.message, 500));
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
    } catch (error) {
        next(new ApiError('Não foi possível criar um agente', 400));
    }
};

const updateAgent = (req, res, next) => {
    const { id } = req.params;
    try {
        const data = agentesSchema.parse(req.body);
        const updated = repository.update(id, data);
        if (!updated) return next(new ApiError('Agente não encontrado.', 404));
        res.status(200).json(updated);
    } catch (error) {
        next(new ApiError('Erro ao atualizar o agente.', 400));
    }
};

const patchAgent = (req, res, next) => {
  const { id } = req.params;
  try {
    const partialData = agentPatchSchema.parse(req.body);
    const updated = repository.patch(id, partialData);
    if (!updated) return next(new ApiError('Agente não encontrado.', 404));
    res.status(200).json(updated);
  } catch (error) {
    next(new ApiError('Erro ao atualizar o agente', 400));
  }
};


const deleteAgent = (req, res, next) => {
    const { id } = req.params;
    try {
        const deleted = repository.remove(id);
        if (!deleted) return next(new ApiError('Agente não encontrado.', 404));
        res.sendStatus(204);
    } catch (error) {
        next(new ApiError('Erro ao deletar agente.'));
    }
};

export { getAllAgents, getAgentById, createAgent, updateAgent, patchAgent, deleteAgent };