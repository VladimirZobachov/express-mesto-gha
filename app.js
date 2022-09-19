const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { errorHandler } = require('./midlewares/error');
const router = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
});
