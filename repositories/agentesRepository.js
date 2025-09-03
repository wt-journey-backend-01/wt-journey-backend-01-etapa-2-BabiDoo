import { v4 as uuidv4 } from 'uuid';

const agents = [];

const findAll = () => agents;

const findById = (id) => agents.find((a) => a.id === id);

const create = (data) => {
  const newAgent = { ...data, id: uuidv4() };
  agents.push(newAgent);
  return newAgent;
};

const update = (id, data) => {
  const i = agents.findIndex(a => a.id === id);
  if (i === -1) return null;
  agents[i] = { ...data, id }; 
  return agents[i];
};

const patch = (id, partial) => {
  const i = agents.findIndex(a => a.id === id);
  if (i === -1) return null;
  agents[i] = { ...agents[i], ...partial }; 
  return agents[i];
};

const remove = (id) => {
  const index = agents.findIndex((a) => a.id === id);
  if (index === -1) return false;
  agents.splice(index, 1);
  return true;
};

export { findAll, findById, create, update, patch, remove };