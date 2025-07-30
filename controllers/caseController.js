import * as repository from '../repositories/caseRepository.js';
import { caseSchema } from '../utils/caseValidation.js';
import { casePatchSchema } from '../utils/partialDataValidation.js';

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
    } catch (error) {
        next( new ApiError ('Não foi possível listar os casos'));
    }
};

const getCaseById = (req, res, next) => {
  const { id } = req.params;
  try {
    const caseItem = repository.findById(id);
    if (!caseItem) return next(new ApiError('Caso não encontrado.', 404));
    res.status(200).json(caseItem);
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

const createCase = (req, res, next) => {
    try {
        const data = caseSchema.parse(req.body);
        const createdCase = repository.create(data);
        res.status(201).json(createdCase);
    } catch (error) {
        next(new ApiError('Não foi possível criar este caso', 400));
    }
};

const updateCase = (req, res, next) => {
    const { id } = req.params;
    try {
        const data = caseSchema.parse(req.body);
        const updated = repository.update(id, data);
        if (!updated) return next(new ApiError('Caso não encontrado.', 404));
        res.status(200).json(updated);
    } catch (error) {
        next(new ApiError('Erro ao atualizar o caso.', 400));
    }
};

const patchCase = (req, res, next) => {
  const { id } = req.params;
  try {
    const partialData = casePatchSchema.parse(req.body);
    const updated = repository.patch(id, partialData);
    if (!updated) return next(new ApiError('Caso não encontrado.', 404));
    res.status(200).json(updated);
  } catch (error) {
    next(new ApiError('Erro ao atualizar o caso.', 400));
  }
};


const deleteCase = (req, res, next) => {
    const { id } = req.params;
    try {
        const deleted = repository.remove(id);
        if (!deleted) return next(new ApiError('Caso não encontrado.', 404));
        res.sendStatus(204);
    } catch (error) {
        next(new ApiError('Erro ao deletar o caso.'));
    }
};

export { getAllCases, getCaseById, createCase, updateCase, patchCase, deleteCase };