export default function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;
  const message = err.message || 'Erro interno do servidor.';
  res.status(status).json({ status, message });
}