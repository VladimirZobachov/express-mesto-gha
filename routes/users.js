const express = require('express');

const userRoutes = express.Router();

const {
  getUsers, getUserById, updateUser, updateUserAvatar, getCurUser,
} = require('../controllers/users');
const { validateUserId, validateUpdateUser, validateUpdateAvatar } = require('../validator');

userRoutes.get('/users', getUsers);
userRoutes.get('/users/me', getCurUser);
userRoutes.get('/users/:userId', validateUserId, getUserById);
userRoutes.patch('/users/me', validateUpdateUser, updateUser);
userRoutes.patch('/users/me/avatar', validateUpdateAvatar, updateUserAvatar);

module.exports = { userRoutes };
