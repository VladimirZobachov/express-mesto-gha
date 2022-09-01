const express = require('express');

const routes = express.Router();

const { createUser, getUsers, getUserById, updateUser, updateUserAvatar } = require('../controllers/users');
const { createCard, getCards, delCardById, addLike, delLike } = require('../controllers/cards');

routes.get('/', (req, res) => {
  res.send('hello');
});

routes.get('/users', getUsers);
routes.get('/users/:userId', getUserById);
routes.post('/users', createUser);
routes.patch('/users/me', updateUser);
routes.patch('/users/me/avatar', updateUserAvatar);

routes.get('/cards', getCards);
routes.post('/cards', createCard);
routes.delete('/cards/:cardId', delCardById);
routes.put('/cards/:cardId/likes', addLike);
routes.delete('/cards/:cardId/likes', delLike);

module.exports = { routes };
