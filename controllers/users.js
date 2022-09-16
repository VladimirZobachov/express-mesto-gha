const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const {
  OK,
  ERROR_CODE,
  NOT_FOUND,
  ERROR_MESSAGE,
  ERROR_CODE_USER_MESSAGE,
  ERROR_CODE_USER_UPDATE_MESSAGE,
  ERROR_CODE_AVATAR_UPDATE_MESSAGE,
  NOT_FOUND_USERS_MESSAGE,
  NOT_FOUND_USER_MESSAGE,
} = require('../utils/const');

const defResponse = (res) => res.status(ERROR_CODE).send(ERROR_MESSAGE);

const createUser = async (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      about,
      avatar,
    });
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(NOT_FOUND).send(NOT_FOUND_USERS_MESSAGE);
    }
    return res.send(users);
  } catch (e) {
    return defResponse(res);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(NOT_FOUND).send(NOT_FOUND_USER_MESSAGE);
    }
    return res.send(user);
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(ERROR_CODE).send(ERROR_CODE_USER_MESSAGE);
    }
    return defResponse(res);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { name, about }, { new: true });
    if (!name || !about) {
      return res.status(ERROR_CODE).send(ERROR_CODE_USER_UPDATE_MESSAGE);
    }
    return res.status(OK).send(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(ERROR_CODE).send(ERROR_CODE_USER_UPDATE_MESSAGE);
    }
    return defResponse(res);
  }
};

const updateUserAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { avatar }, { new: true });
    if (!avatar) {
      return res.status(ERROR_CODE).send(ERROR_CODE_AVATAR_UPDATE_MESSAGE);
    }
    return res.status(OK).send(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(ERROR_CODE).send(ERROR_CODE_AVATAR_UPDATE_MESSAGE);
    }
    return defResponse(res);
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => new Error('Пользователь не найден'))
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((isUserValid) => {
          if (isUserValid) {
            const token = jwt.sign({ _id: user._id }, 'SECRET');
            res.cookie('jwt', token, {
              maxAge: 3600000,
              httpOnly: true,
              sameSite: true,
            });
            res.send({ data: user.toJSON() });
          } else {
            res.status(401).send({ message: 'Неправильная почта или пароль' });
          }
        });
    })
    .catch(next);
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  login,
};
