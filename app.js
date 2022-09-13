const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routers = require('./routes');
const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  req.user = {
    _id: '630f52ddf8c939055266bccb',
  };
  next();
});

app.use(routers);

app.listen(PORT, () => {
});
