const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const { DuplicateError } = require('../errorsClasses/DuplicateError');
const { NotAuthError } = require('../errorsClasses/NotAuthError');
const { NotFoundError } = require('../errorsClasses/NotFoundError');
const { ValidationError } = require('../errorsClasses/ValidationError');

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
    return res.status(200).send(user);
  } catch (err) {
    if (err.code === 11000) {
      return next(new DuplicateError('Есть такой email в базе'));
    }
    if (err.name === 'ValidationError') {
      return next(new ValidationError('Некорректные дянные при получении пользователя'));
    }
    return next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    if (!users) {
      throw new NotFoundError('Ничего не найдено');
    }
    return res.send(users);
  } catch (err) {
    return next(err);
  }
};

const getCurUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError('Ничего не найдено');
    }
    return res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ValidationError('Некорректные дянные при получении пользователя'));
    }
    return next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      throw new NotFoundError('Ничего не найдено');
    }
    return res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ValidationError('Некорректные дянные при получении пользователя'));
    }
    return next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { name, about }, { new: true });
    if (!user) {
      throw new NotFoundError('Ничего не найдено');
    }
    return res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ValidationError('Некорректные дянные при обновлении пользователя'));
    }
    return next(err);
  }
};

const updateUserAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { avatar }, { new: true });
    if (!user) {
      throw new NotFoundError('Ничего не найдено');
    }
    return res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ValidationError('Некорректные дянные при обновлении аватара'));
    }
    return next(err);
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new NotAuthError('Неправильная почта или пароль');
    })
    .then((user) => bcrypt.compare(password, user.password)
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
          throw new NotAuthError('Неправильная почта или пароль');
        }
      }))
    .catch(next);
};

module.exports = {
  createUser,
  getUsers,
  getCurUser,
  getUserById,
  updateUser,
  updateUserAvatar,
  login,
};
