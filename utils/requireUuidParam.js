import { validate as isUuid } from 'uuid';

export const requireUuidParam = (paramName) => (req, res, next) => {
  const id = req.params[paramName];
  if (!isUuid(id)) {
    return res.status(400).json({ error: `Parâmetro ${paramName} inválido, deve ser um UUID.` });
  }
  next();
};