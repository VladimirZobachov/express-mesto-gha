const express = require("express");
const userRoutes = express.Router();

const {getUsers, getUserById, createUser, updateUser, updateUserAvatar} = require("../controllers/users");

userRoutes.get('/users', getUsers);
userRoutes.get('/users/:userId', getUserById);
userRoutes.post('/users', createUser);
userRoutes.patch('/users/me', updateUser);
userRoutes.patch('/users/me/avatar', updateUserAvatar);

module.exports = { userRoutes };