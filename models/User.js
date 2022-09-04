const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'поле name является обязательным для заполнения'],
    minLength: [2, 'минимальное значение поля name 2 символа'],
    maxLength: [30, 'максимально значение поля name 30 символов'],
  },
  about: {
    type: String,
    required: [true, 'поле about является обязательным для заполнения'],
    minLength: [2, 'минимальное значение поля about 2 символа'],
    maxLength: [30, 'максимально значение поля about 30 символов'],
  },
  avatar: {
    type: String,
    required: [true, 'поле avatar является обязательным для заполнения'],
  },
});

module.exports = mongoose.model('user', userSchema);
