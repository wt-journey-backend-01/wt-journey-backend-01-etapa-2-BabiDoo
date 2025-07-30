import * as repository from '../repositories/agentRepository.js';
import { agentSchema } from '../utils/agentValidation.js';
import { agentPatchSchema } from '../utils/partialDataValidation.js';

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
        const data = agentSchema.parse(req.body);
        const agent = repository.create(data);
        res.status(201).json(agent);
    } catch (error) {
        next(new ApiError('Não foi possível criar um agente', 400));
    }
};

const updateAgent = (req, res, next) => {
    const { id } = req.params;
    try {
        const data = agentSchema.parse(req.body);
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