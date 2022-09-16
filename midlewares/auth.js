const jwt = require('jsonwebtoken');
const { NotAuthError } = require('../errorsClasses/NotAuthError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (err) {
    next(new NotAuthError('вы не авторизованы'));
  }
  req.user = payload;
  next();
};

module.exports = auth;
