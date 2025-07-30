const casos = [];

const findAll = () => casos;

const findById = (id) => casos.find((c) => c.id === id);

const create = (newCase) => {
    casos.push(newCase);
    return newCase;
};

const update = (id, data) => {
    const index = casos.findIndex((c) => c.id === id);
    if(index > -1) casos[index] = { ...casos[index], ...data };
    return casos[index];
}

const patch = (id, partialData) => {
    const index = casos.findIndex((c) => c.id === id);
    if(index > -1) casos[index] = { ...casos[index], ...partialData};
    return casos[index];
}

const remove = (id) => {
    const index = casos.findIndex((c) => c.id === id);
    if(index > -1) {
        casos.splice(index, 1);
        return true;
    }
    return false;
}

export { findAll, findById, create, update, patch, remove };
