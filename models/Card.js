const mongoose = require('mongoose');
const validLink = require('../validator');

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
      validator(v) {
        return validLink.isURL(v);
      },
      message: 'Введите пожалуйста url',
    },
  },
  ref: {
    type: mongoose.Types.ObjectId,
    required: [true, 'поле ref является обязательным для заполнения'],
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
