const jwt = require('jsonwebtoken');
const {NotAuthError} = require("./error");

const auth = (res, req, next) => {
  let payload;
  try {
    const token = req.cookies.jwt;
    payload = jwt.verify(token, 'SECRET');
  } catch (err) {
    next(new NotAuthError('Не пройдена авторизация'));
  }
  req.user = payload;
  next();
};

module.exports = auth;
