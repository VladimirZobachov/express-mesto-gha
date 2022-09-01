const express = require('express');
const cardRoutes = express.Router();

const { createCard, getCards, delCardById, addLike, delLike } = require('../controllers/cards');

cardRoutes.get('/cards', getCards);
cardRoutes.post('/cards', createCard);
cardRoutes.delete('/cards/:cardId', delCardById);
cardRoutes.put('/cards/:cardId/likes', addLike);
cardRoutes.delete('/cards/:cardId/likes', delLike);

module.exports = { cardRoutes };