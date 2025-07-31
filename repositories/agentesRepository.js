const agentes = [
  {
    "name": "Ana Silva",
    "incorporationDate": "2024-07-15",
    "position": "Coordenadora",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  {
    "name": "Carlos Pereira",
    "incorporationDate": "2023-12-01",
    "position": "Analista",
    "id": "7d9f1b0e-9c2d-4f5a-8c3d-1e7b9a2d4f6c"
  },
  {
    "name": "Mariana Costa",
    "incorporationDate": "2022-11-30",
    "position": "Gerente",
    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
  },
  {
    "name": "Rafael Souza",
    "incorporationDate": "2025-01-05",
    "position": "Especialista Técnico",
    "id": "9b2d7f1e-3e4f-4c8a-b2d1-5f6a7e8c9d0b"
  }
];

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
    if(index > -1) {
        agentes.splice(index, 1);
        return true;
    }
    return false;
}

export { findAll, findById, create, update, patch, remove };

