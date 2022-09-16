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

module.exports = {
  errorHandler,
  NotAuthError,
};
