const express = require('express');
const { auth } = require('../midlewares/auth');

const userRoutes = express.Router();

const {
  getUsers, getUserById, updateUser, updateUserAvatar, createUser, login
} = require('../controllers/users');


userRoutes.post('/signup', createUser);
userRoutes.post('/signin', login);
userRoutes.get('/users', getUsers);
userRoutes.get('/users/:userId', getUserById);
userRoutes.patch('/users/me', updateUser);
userRoutes.patch('/users/me/avatar', updateUserAvatar);

module.exports = { userRoutes };
