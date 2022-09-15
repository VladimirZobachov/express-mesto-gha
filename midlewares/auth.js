const jwt = require('jsonwebtoken');

const auth = (res, req, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (err) {
    res.send.status(401);
  }
  req.user = payload;
  next();
};

module.exports = auth;
