const express = require('express');

const cardRoutes = express.Router();

const {
  createCard, getCards, delCardById, addLike, delLike,
} = require('../controllers/cards');
const { validateCardId, validateCardBody } = require('../validator');
const { NotFoundError } = require('../errorsClasses/NotFoundError');

cardRoutes.get('/cards', getCards);
cardRoutes.post('/cards', validateCardBody, createCard);
cardRoutes.delete('/cards/:cardId', validateCardId, delCardById);
cardRoutes.put('/cards/:cardId/likes', validateCardId, addLike);
cardRoutes.delete('/cards/:cardId/likes', validateCardId, delLike);

cardRoutes.use((err, req, res, next) => {
  try {
    next();
  } catch (e) {
    next(new NotFoundError('Страница не найдена'));
  }
});

module.exports = { cardRoutes };
