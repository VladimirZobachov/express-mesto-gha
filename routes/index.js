const express = require('express');

const router = express.Router();
const { validateUserBody } = require('../validator');
const { createUser, login } = require('../controllers/users');
const { validateLogin } = require('../validator');
const auth = require('../midlewares/auth');
const { userRoutes } = require('./users');
const { cardRoutes } = require('./cards');
const { NotFoundError } = require('../errorsClasses/NotFoundError');

router.post('/signup', validateUserBody, createUser);
router.post('/signin', validateLogin, login);
router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

router.use(auth);
router.use(userRoutes);
router.use(cardRoutes);
router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
