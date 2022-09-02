const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {userRoutes} = require("./routes/users");
const {cardRoutes} = require("./routes/cards");

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
  if(res.status(404)){
      res.send({message: 'Неправильный адрес запроса.'});
  }
  next();
})

app.listen(PORT, () => {
  console.log('Server run');
});
