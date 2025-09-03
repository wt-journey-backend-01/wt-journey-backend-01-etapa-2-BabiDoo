import * as repository from '../repositories/agentesRepository.js';
import { agentSchema, agentPutValidation} from '../utils/agentValidation.js';
import { agentPatchSchema } from '../utils/partialDataValidation.js';
import { ZodError, z } from 'zod';

const idSchema = z.object({ id: z.uuid() });

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
    if (err instanceof ZodError) {
      console.log(err);
      return next(new ApiError('Parâmetros de consulta inválidos.', 400));
    } 
    return next(new ApiError('Não foi possível listar os agentes.'));
  }
};

export const getAgentById = (req, res, next) => {
  console.log(req.params.id)
  let id;
  try {
    ({ id } = idSchema.parse(req.params));
  } catch {
    return next(new ApiError("Agente não encontrado.", 404));
  }
  const agent = repository.findById(id);
  if (!agent) return next(new ApiError('Agente não encontrado.', 404));
  try {
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
    if (err instanceof ZodError) {
      return next(new ApiError('Parâmetros inválidos.', 400))};
    return next(new ApiError('Erro ao criar o agente.'));
  }
};

export const updateAgent = (req, res, next) => {
  let id;
  try {
    ({ id } = idSchema.parse(req.params));
  } catch {
    return next(new ApiError("Agente não encontrado.", 404));
  }
  const current = repository.findById(id);
  if (!current) return next(new ApiError("Agente não encontrado.", 404));
  try {
    // const candidate = { ...current, ...req.body };
    // console.log(candidate);
    const data = agentSchema.parse(req.body);
    const updated = repository.update(id, data);
    return res.status(200).json(updated);
  } catch (err) {
    if (err instanceof ZodError) {
      console.log(err);
      return next(new ApiError("Parâmetros inválidos.", 400));
    }
    console.log(err);
    return next(new ApiError("Erro ao atualizar o agente."));
  }
};

export const patchAgent = (req, res, next) => {
  let id;
  try {
    ({ id } = idSchema.parse(req.params));
  } catch {
    return next(new ApiError("Agente não encontrado.", 404));
  }
  const current = repository.findById(id);
  console.log(current);
  if (!current) return next(new ApiError("Agente não encontrado.", 404));
  try {
    const candidate = { ...current, ...req.body };
    console.log('patching agentes')
    // console.log(candidate);
    const data = agentPutValidation.parse(candidate);
    const updated = repository.patch(id, data);
    console.log('patched: ', updated);
    return res.status(200).json(updated);
  } catch (err) {
    if (err instanceof ZodError) {
      console.log(err);
      return next(new ApiError("Parâmetros inválidos.", 400));
    }
    console.log(err);
    return next(new ApiError("Erro ao atualizar o agente."));
  }
};

export const deleteAgent = (req, res, next) => {
  let id;
  try {
    ({ id } = idSchema.parse(req.params));
  } catch {
    return next(new ApiError("Agente não encontrado.", 404));
  }
  const current = repository.findById(id);
  if (!current) return next(new ApiError("Agente não encontrado.", 404));
  try {
    const { id } = req.params;
    const deleted = repository.remove(id);
    return res.sendStatus(204);
  } catch {
    return next(new ApiError('Erro ao deletar agente.'));
  }
};
