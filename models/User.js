const mongoose = require('mongoose');
const validEmail = require('validator');
const { validateLink } = require('../utils/validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'поле name является обязательным для заполнения'],
    validate: {
      validator(v) {
        return validEmail.isEmail(v);
      },
      message: 'Введите пожалуйста Email',
    },
    unique: true,
  },
  password: {
    type: String,
    select: false,
    required: [true, 'поле name является обязательным для заполнения'],
  },
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minLength: [2, 'минимальное значение поля name 2 символа'],
    maxLength: [30, 'максимально значение поля name 30 символов'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minLength: [2, 'минимальное значение поля about 2 символа'],
    maxLength: [30, 'максимально значение поля about 30 символов'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: [validateLink, 'Некорректная ссылка'],
  },
});

userSchema.methods.toJSON = function toJSN() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('user', userSchema);
