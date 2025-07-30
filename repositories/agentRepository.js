const agents = [];

const findAll = () => agents;

const findById = (id) => agents.find((a) => a.id === id);

const create = (agent) => {
    agents.push(agent);
    return agent;
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

