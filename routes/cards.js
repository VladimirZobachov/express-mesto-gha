const express = require('express');

const cardRoutes = express.Router();

const {
  createCard, getCards, delCardById, addLike, delLike,
} = require('../controllers/cards');
const { validateCardId, validateCardBody } = require('../validator');

cardRoutes.get('/cards', getCards);
cardRoutes.post('/cards', validateCardBody, createCard);
cardRoutes.delete('/cards/:cardId', validateCardId, delCardById);
cardRoutes.put('/cards/:cardId/likes', addLike);
cardRoutes.delete('/cards/:cardId/likes', delLike);

module.exports = { cardRoutes };
