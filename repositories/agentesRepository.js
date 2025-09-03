import { v4 as uuidv4 } from 'uuid';

const agents = [];

const findAll = () => agents;

const findById = (id) => agents.find((a) => a.id === id);

const create = (data) => {
  const newAgent = { ...data, id: uuidv4() }; //cria agentes com uuidv4()
  agents.push(newAgent);
  return newAgent;
};

const update = (id, data) => {
  const index = agents.findIndex((a) => a.id === id);
  if (index === -1) return null;
  agents[index] = { ...data, id };
  return agents[index];
};

const patch = (id, partialData) => {
  const index = agents.findIndex((a) => a.id === id);
  if (index === -1) return null;
  agents[index] = { ...agents[index], ...partialData };
  return agents[index];
};

const remove = (id) => {
  const index = agents.findIndex((a) => a.id === id);
  if (index === -1) return false;
  agents.splice(index, 1);
  return true;
};

export { findAll, findById, create, update, patch, remove };
