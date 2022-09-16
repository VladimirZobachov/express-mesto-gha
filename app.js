const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { userRoutes } = require('./routes/users');
const { cardRoutes } = require('./routes/cards');
const auth = require('./midlewares/auth');
const { validateUserBody } = require('./utils/validator');
const { createUser, login } = require('./controllers/users');
const { errorHandler } = require('./midlewares/error');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.use(bodyParser.json());
app.use(cookieParser());

app.post('/signup', validateUserBody, createUser);
app.post('/signin', login);

app.use(auth);
app.use(userRoutes);
app.use(cardRoutes);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
});
