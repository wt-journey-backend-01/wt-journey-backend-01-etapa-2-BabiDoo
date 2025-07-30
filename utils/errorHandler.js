export function errorHandler(err, req, res, next) {
  if (err.name === 'ApiError') {
    return res.status(err.statusCode).json({ message: err.message });
  }
  console.error(err);
  return res.status(500).json({ message: 'Internal Server Error' });
}