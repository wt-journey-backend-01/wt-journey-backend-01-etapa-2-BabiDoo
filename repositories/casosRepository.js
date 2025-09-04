import { v4 as uuidv4 } from 'uuid';

const cases = [{
    "titulo": "Roubo",
    "descricao": "Itens levados",
    "status": "aberto",
    "agente_id": "76c38917-db8e-479b-a771-a24b7c96748b",
    "id": "27de17e2-0786-43f9-8ba8-a52fbd695ba2"
}];

const findAll = () => cases;

const findById = (id) => cases.find((c) => c.id === id);

const create = (data, agente_id) => {
  const newCase = { ...data, agente_id, id: uuidv4() };; //cria casos com uuidv4()
  cases.push(newCase);
  return newCase;
};

const update = (id, data) => {
  const index = cases.findIndex((c) => c.id === id);
  if (index === -1) return null;
  cases[index] = { ...data, id };
  return cases[index];
};

const patch = (id, partialData) => {
  const index = cases.findIndex((c) => c.id === id);
  if (index === -1) return null;
  cases[index] = { ...cases[index], ...partialData };
  return cases[index];
};

const remove = (id) => {
  const index = cases.findIndex((c) => c.id === id);
  if (index === -1) return false;
  cases.splice(index, 1);
  return true;
};

export { findAll, findById, create, update, patch, remove };
