const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routers = require('./routes');
const auth = require('./midlewares/auth');
const { createUser, login } = require('./controllers/users');
const { errorHandler } = require('./midlewares/error');
const { validateUserBody } = require('./validator');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.use(bodyParser.json());
app.use(cookieParser());

app.post('/signup', createUser, validateUserBody);
app.post('/signin', login);

app.use(auth);
app.use(routers);
app.use(errorHandler);

app.listen(PORT, () => {});
