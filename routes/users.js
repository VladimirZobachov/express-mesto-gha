const express = require('express');

const userRoutes = express.Router();

const {
  getUsers, getUserById, updateUser, updateUserAvatar,
} = require('../controllers/users');

userRoutes.get('/users', getUsers);
userRoutes.get('/users/:userId', getUserById);
userRoutes.patch('/users/me', updateUser);
userRoutes.patch('/users/me/avatar', updateUserAvatar);

module.exports = { userRoutes };
