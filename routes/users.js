const express = require('express');

const userRoutes = express.Router();

const {
  getUsers, getUserById, updateUser, updateUserAvatar, getCurUser,
} = require('../controllers/users');
const { validateUserId, validateUpdateUser, validateUpdateAvatar } = require('../validator');
const { NotFoundError } = require('../errorsClasses/NotFoundError');

userRoutes.get('/users', getUsers);
userRoutes.get('/users/me', getCurUser);
userRoutes.get('/users/:userId', validateUserId, getUserById);
userRoutes.patch('/users/me', validateUpdateUser, updateUser);
userRoutes.patch('/users/me/avatar', validateUpdateAvatar, updateUserAvatar);

userRoutes.use((err, req, res, next) => {
  try {
    next();
  } catch (e) {
    next(new NotFoundError('Страница не найдена'));
  }
});

module.exports = { userRoutes };
