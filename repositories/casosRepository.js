const casos = [
  {
    "title": "Homicídio no centro",
    "description": "Corpo encontrado em avenida movimentada; testemunhas contraditórias e sem identificação do autor.",
    "status": "Aberto",
    "responsibleAgentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  {
    "title": "Roubo a banco com reféns",
    "description": "Assaltantes invadiram agência e fizeram reféns; negociação conduzida e suspeitos detidos.",
    "status": "Solucionado",
    "responsibleAgentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  {
    "title": "Tráfico de drogas em zona residencial",
    "description": "Operação de venda de entorpecentes identificada em prédio; vigilância em andamento.",
    "status": "Aberto",
    "responsibleAgentId": "7d9f1b0e-9c2d-4f5a-8c3d-1e7b9a2d4f6c"
  },
  {
    "title": "Corrupção de funcionário público",
    "description": "Denúncia de desvio de verba com conluio interno; coleta de provas em fase final.",
    "status": "Solucionado",
    "responsibleAgentId": "7d9f1b0e-9c2d-4f5a-8c3d-1e7b9a2d4f6c"
  },
  {
    "title": "Investigação de quadrilha de furtos de carga",
    "description": "Sequência de roubos de caminhões em rodovias; padrão sugerindo organização criminosa.",
    "status": "Solucionado",
    "responsibleAgentId": "7d9f1b0e-9c2d-4f5a-8c3d-1e7b9a2d4f6c"
  },
  {
    "title": "Sequestro de empresário",
    "description": "Vítima mantida em cativeiro e exigência de resgate; equipe de negociação ativa.",
    "status": "Aberto",
    "responsibleAgentId": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
  },
  {
    "title": "Estelionato com identidade falsificada",
    "description": "Golpe envolvendo documentos clonados para abertura de contas e empréstimos fraudados.",
    "status": "Solucionado",
    "responsibleAgentId": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
  },
  {
    "title": "Ataque cibernético à base de dados da polícia",
    "description": "Tentativa de invasão e exfiltração de registros sigilosos através de brecha em sistema legado.",
    "status": "Aberto",
    "responsibleAgentId": "9b2d7f1e-3e4f-4c8a-b2d1-5f6a7e8c9d0b"
  },
  {
    "title": "Vandalismo em patrimônio histórico",
    "description": "Pichação e destruição de monumentos públicos durante protesto; suspeitos identificados.",
    "status": "Solucionado",
    "responsibleAgentId": "9b2d7f1e-3e4f-4c8a-b2d1-5f6a7e8c9d0b"
  },
  {
    "title": "Violência doméstica recorrente",
    "description": "Denúncias múltiplas contra o mesmo agressor; vítima reluta em formalizar queixa, proteção em curso.",
    "status": "Aberto",
    "responsibleAgentId": "9b2d7f1e-3e4f-4c8a-b2d1-5f6a7e8c9d0b"
  }
];

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
