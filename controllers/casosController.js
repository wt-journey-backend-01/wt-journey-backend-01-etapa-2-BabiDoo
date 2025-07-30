import * as repository from '../repositories/casosRepository.js';
import * as agentesRepo from '../repositories/agentesRepository.js';
import { casosSchema } from '../utils/casosValidation.js';
import { casosPatchSchema } from '../utils/dadosParciaisValidation.js';
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

const getAllCases = (req, res, next) => {
    try {
        const cases  = repository.findAll();
        res.status(200).json(cases)
    } catch (err) {
        next( new ApiError ('Não foi possível listar os casos'));
    }
};

const getCaseById = (req, res, next) => {
  try {
    const id = idSchema.parse(req.params.id);
    const caseItem = repository.findById(id);
    if (!caseItem) return next(new ApiError('Caso não encontrado.', 404));
    res.status(200).json(caseItem);
  } catch (err) {
    if (err instanceof ZodError) {
      return next(new ApiError(err.message, 400));
    }
    next(new ApiError('Erro ao buscar o caso.', 500));
  }
};

const createCase = (req, res, next) => {
    try {
        const data = casosSchema.parse(req.body);
        if (!agentesRepo.findById(data.agenteId)) {
            return next(new ApiError('Agente informado não existe.', 404));
        }
    
        const newCase = {
            id: uuidv4(),
            ...data
        };

        const caseItem = repository.create(newCase);
        res.status(201).json(caseItem);
    } catch (err) {
        if (err instanceof ZodError) {
            return next(new ApiError(err.message, 400));
        }
    next(new ApiError('Não foi possível criar este caso.', 500));
  }
};

const updateCase = (req, res, next) => {
    try {
        const id = idSchema.parse(req.params.id);
        const data = casosSchema.parse(req.body);
        if (!agentesRepo.findById(data.agenteId)) {
            return next(new ApiError('Agente informado não existe.', 404));
        }
        const updated = repository.update(id, data);
        if (!updated) return next(new ApiError('Caso não encontrado.', 404));
        res.status(200).json(updated);
    } catch (err) {
        if (err instanceof ZodError) {
        return next(new ApiError(err.message, 400));
    }
    next(new ApiError('Erro ao atualizar o caso.', 500));
  }
};

const patchCase = (req, res, next) => {
  try {
    const id = idSchema.parse(req.params.id);
    const partialData = casosPatchSchema.parse(req.body);
    if (partialData.agenteId && !agentesRepo.findById(partialData.agenteId)) {
      return next(new ApiError('Agente informado não existe.', 404));
    }
    const updated = repository.patch(id, partialData);
    if (!updated) return next(new ApiError('Caso não encontrado.', 404));
    res.status(200).json(updated);
  } catch (err) {
    if (err instanceof ZodError) {
      return next(new ApiError(err.message, 400));
    }
    next(new ApiError('Erro ao atualizar parcialmente o caso.', 500));
  }
};


const deleteCase = (req, res, next) => {
    try {
        const id = idSchema.parse(req.params.id);
        const deleted = repository.remove(id);
        if (!deleted) return next(new ApiError('Caso não encontrado.', 404));
        res.sendStatus(204);
    } catch (err) {
    if (err instanceof ZodError) {
      return next(new ApiError(err.message, 400));
    }
    next(new ApiError('Erro ao deletar o caso.', 500));
  }
};

export { getAllCases, getCaseById, createCase, updateCase, patchCase, deleteCase };