const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { userRoutes } = require('./routes/users');
const { cardRoutes } = require('./routes/cards');
const { NOT_FOUND, NOT_FOUND_PAGE_MESSAGE } = require('./const');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '630f52ddf8c939055266bccb',
  };

  next();
});

app.use(userRoutes);
app.use(cardRoutes);
app.use((req, res, next) => {
  res.status(NOT_FOUND);
  res.send(NOT_FOUND_PAGE_MESSAGE);
  next();
});

app.listen(PORT, () => {
});
