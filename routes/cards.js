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

cardRoutes.use((req, res, next) => {
  throw new NotFoundError('Страница не найдена');
  next();
});

module.exports = { cardRoutes };
