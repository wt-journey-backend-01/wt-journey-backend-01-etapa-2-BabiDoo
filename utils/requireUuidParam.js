import { validate as isUuid } from 'uuid';

export const requireUuidParam = (param = 'id') => (req, res, next) => {
  const val = req.params[param];
  if (!isUuid(val)) return next(Object.assign(new Error('ID inválido'), { name: 'ApiError', statusCode: 400 }));
  next();
};