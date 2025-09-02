export const errorHandler = (err, req, res, next) => {
  if (err.name === 'ApiError') {
    return res.status(err.statusCode).json({ error: err.message });
  }
  console.error(err);
  return res.status(500).json({ error: 'Erro interno do servidor' });
}