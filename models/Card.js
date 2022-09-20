const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'поле name является обязательным для заполнения'],
    minLength: [2, 'минимальное значение поля name 2 символа'],
    maxLength: [30, 'максимально значение поля name 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'поле link является обязательным для заполнения'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Введите пожалуйста url',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardSchema);
