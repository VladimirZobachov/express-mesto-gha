const router = require('express').Router();

const { userRoutes } = require('./users');
const { cardRoutes } = require('./cards');

const { NOT_FOUND, NOT_FOUND_PAGE_MESSAGE } = require('../const');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use((req, res, next) => {
  res.status(NOT_FOUND);
  res.send(NOT_FOUND_PAGE_MESSAGE);
  next();
});

module.exports = router;
