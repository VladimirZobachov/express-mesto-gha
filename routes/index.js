const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const { userRoutes } = require('./users');
const { cardRoutes } = require('./cards');
const auth = require('../midlewares/auth');
const {NOT_FOUND, NOT_FOUND_PAGE_MESSAGE} = require("../const");

router.post('/signup', createUser);
router.post('/signin', login);
router.use(auth);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use((req, res, next) => {
  res.status(NOT_FOUND);
  res.send(NOT_FOUND_PAGE_MESSAGE);
  next();
});

module.exports = router;
