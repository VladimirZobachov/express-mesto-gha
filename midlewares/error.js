const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({

      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next(err);
};

class NotAuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class DuplicateError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = {
  errorHandler,
  NotAuthError,
  DuplicateError,
};
