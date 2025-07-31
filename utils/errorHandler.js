export function errorHandler(err, req, res, next) {
  if (err.name === 'ApiError') {
    const body = {
      status: err.statusCode,
      message: err.message,
      ...(err.errors && { errors: err.errors }),
    };
    return res.status(err.statusCode).json(body);
  }
  console.error(err);
  return res.status(500).json({ message: 'Internal Server Error' });
}