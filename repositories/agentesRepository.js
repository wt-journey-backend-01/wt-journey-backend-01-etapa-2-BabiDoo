const agentes = [];

const findAll = () => agentes;

const findById = (id) => agentes.find((a) => a.id === id);

const create = (agente) => {
    agentes.push(agente);
    return agente;
};

const update = (id, data) => {
    const index = agentes.findIndex((a) => a.id === id);
    if(index > -1) agentes[index] = { ...agentes[index], ...data };
    return agentes[index];
}

const patch = (id, partialData) => {
    const index = agentes.findIndex((a) => a.id === id);
    if(index > -1) agentes[index] = { ...agentes[index], ...partialData};
    return agentes[index];
}

const remove = (id) => {
    const index = agentes.findIndex((a) => a.id === id);
    if(index > -1) agentes.splice(index, 1);
}

export { findAll, findById, create, update, patch, remove };

