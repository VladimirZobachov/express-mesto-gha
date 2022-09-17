const express = require('express');
const { NOT_FOUND, NOT_FOUND_PAGE_MESSAGE } = require('../utils/const');

const userRoutes = express.Router();

const {
  getUsers, getUserById, updateUser, updateUserAvatar, getCurUser,
} = require('../controllers/users');

userRoutes.get('/users', getUsers);
userRoutes.get('/users/me', getCurUser);
userRoutes.get('/users/:userId', getUserById);
userRoutes.patch('/users/me', updateUser);
userRoutes.patch('/users/me/avatar', updateUserAvatar);

userRoutes.use((req, res, next) => {
  res.status(NOT_FOUND);
  res.send(NOT_FOUND_PAGE_MESSAGE);
  next();
});

module.exports = { userRoutes };
