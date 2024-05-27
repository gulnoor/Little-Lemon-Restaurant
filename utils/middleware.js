const { consoleLog } = require('./logger');

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response
      .status(400)
      .send({ error: `malformatted id:\n${error.message}` });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  if (
    error.name === 'MongoServerError'
    && error.message.includes('E11000 duplicate key error')
  ) {
    return response
      .status(400)
      .json({ error: 'expected `username` to be unique' });
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' });
  }

  return next(error);
};
const getToken = (request, response, next) => {
  const header = request.header('Authorization');
  request.token = header ? header.replace('Bearer ', '') : null;
  next();
};
const requestLogger = (request, response, next) => {
  consoleLog(
    `-------------------------
  Method: ${request.method}
  Path: ${request.path}
  Body: ${JSON.stringify(request.body)}
  -----------------------`,
  );
  next();
};
const unknownPathHandler = (req, res, next) => {
  res.status(404).send('unknown endpoint');
  next();
};
module.exports = {
  errorHandler,
  requestLogger,
  unknownPathHandler,
  getToken,
};
