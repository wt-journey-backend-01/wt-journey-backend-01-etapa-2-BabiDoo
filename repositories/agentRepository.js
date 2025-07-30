import { v4 as uuidv4 } from 'uuid';

const agents = [];

const findAll = () => agents;

const findById = (id) => agents.find((a) => a.id === id);

const create = (data) => {
    const newAgent = { id: uuidv4(), ...data};
    agents.push(newAgent);
    return newAgent;
};

const update = (id, data) => {
    const index = agents.findIndex((a) => a.id === id);
    if(index > -1) agents[index] = { ...agents[index], ...data };
    return agents[index];
}

const patch = (id, partialData) => {
    const index = agents.findIndex((a) => a.id === id);
    if(index > -1) agents[index] = { ...agents[index], ...partialData};
    return agents[index];
}

const remove = (id) => {
    const index = agents.findIndex((a) => a.id === id);
    if(index > -1) agents.splice(index, 1);
}

export { findAll, findById, create, update, patch, remove };

