import express from 'express';
import * as controller from '../controllers/agentesController.js';
import { requireUuidParam } from '../utils/requireUuidParam.js';

const agentRouter = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       required: [error]
 *       properties:
 *         error:
 *           type: string
 *           example: "Agente não encontrado."
 *     Agente:
 *       type: object
 *       required: [id, nome, cargo, dataDeIncorporacao]
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "5a5d1a5b-1f4c-4b1e-9a6d-0b8bf1f1e2a3"
 *         nome:
 *           type: string
 *           example: "Ana"
 *         cargo:
 *           type: string
 *           enum: [delegado, inspetor]
 *           example: delegado
 *         dataDeIncorporacao:
 *           type: string
 *           format: date
 *           example: "2024-07-15"
 *     AgenteCreate:
 *       type: object
 *       required: [nome, cargo, dataDeIncorporacao]
 *       properties:
 *         nome: { type: string, example: "Ana" }
 *         cargo: { type: string, enum: [delegado, inspetor], example: delegado }
 *         dataDeIncorporacao: { type: string, format: date, example: "2024-07-15" }
 *     AgenteUpdate:
 *       type: object
 *       description: Corpo parcial para PATCH (todos opcionais)
 *       properties:
 *         nome: { type: string, example: "Ana" }
 *         cargo: { type: string, enum: [delegado, inspetor], example: inspetor }
 *         dataDeIncorporacao: { type: string, format: date, example: "2024-08-01" }
 *   parameters:
 *     IdParam:
 *       name: id
 *       in: path
 *       required: true
 *       description: UUID do recurso
 *       schema: { type: string, format: uuid }
 *       example: "5a5d1a5b-1f4c-4b1e-9a6d-0b8bf1f1e2a3"
 */

/**
 * @openapi
 * /agentes:
 *   get:
 *     tags: [Agentes]
 *     summary: Listar agentes
 *     responses:
 *       '200':
 *         description: Lista de agentes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Agente' }
 *   post:
 *     tags: [Agentes]
 *     summary: Criar agente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/AgenteCreate' }
 *     responses:
 *       '201':
 *         description: Agente criado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Agente' }
 *       '400':
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 */

/**
 * @openapi
 * /agentes/{id}:
 *   parameters:
 *     - $ref: '#/components/parameters/IdParam'
 *   get:
 *     tags: [Agentes]
 *     summary: Obter agente por ID
 *     responses:
 *       '200':
 *         description: Agente
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Agente' }
 *       '400':
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *       '404':
 *         description: Não encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *   put:
 *     tags: [Agentes]
 *     summary: Atualizar agente (PUT — corpo completo)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/AgenteCreate' }
 *     responses:
 *       '200': { description: Agente atualizado, content: { application/json: { schema: { $ref: '#/components/schemas/Agente' } } } }
 *       '400': { description: Dados inválidos ou ID inválido, content: { application/json: { schema: { $ref: '#/components/schemas/Error' } } } }
 *       '404': { description: Agente não encontrado, content: { application/json: { schema: { $ref: '#/components/schemas/Error' } } } }
 *   patch:
 *     tags: [Agentes]
 *     summary: Atualizar parcialmente agente (PATCH)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/AgenteUpdate' }
 *     responses:
 *       '200': { description: Agente atualizado, content: { application/json: { schema: { $ref: '#/components/schemas/Agente' } } } }
 *       '400': { description: Dados inválidos ou ID inválido, content: { application/json: { schema: { $ref: '#/components/schemas/Error' } } } }
 *       '404': { description: Agente não encontrado, content: { application/json: { schema: { $ref: '#/components/schemas/Error' } } } }
 *   delete:
 *     tags: [Agentes]
 *     summary: Remover agente
 *     responses:
 *       '204': { description: Removido com sucesso (sem conteúdo) }
 *       '400': { description: ID inválido, content: { application/json: { schema: { $ref: '#/components/schemas/Error' } } } }
 *       '404': { description: Agente não encontrado, content: { application/json: { schema: { $ref: '#/components/schemas/Error' } } } }
 */

agentRouter.get('/', controller.getAllAgents);
agentRouter.get('/:id', requireUuidParam('id'), controller.getAgentById);
agentRouter.post('/', controller.createAgent);
agentRouter.put('/:id', requireUuidParam('id'), controller.updateAgent);
agentRouter.patch('/:id', requireUuidParam('id'), controller.patchAgent);
agentRouter.delete('/:id', requireUuidParam('id'), controller.deleteAgent);

export default agentRouter;