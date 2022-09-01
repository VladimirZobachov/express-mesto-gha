const Card = require('../models/Card');

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    const card = await new Card({name, link, owner}).save();
    if(!card){
      return res.status(400).send({message: 'Переданы некорректные данные'});
    }
    res.status(200).send(card);
  }catch (e){
    return res.status(500).send({message: 'Произошла ошибка на сервере'});
  }

};

const getCards = async (req, res) => {
  try{
    const cards = await Card.find({});
    if(!cards){
      return res.status(404).send({message: 'Карточки не найдены'});
    }
    res.send(cards);
  }catch (e){
    return res.status(500).send({message: 'Произошла ошибка на сервере'});
  }
};

const delCardById = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.cardId);
    if(!card){
      return res.status(404).send({message: 'Карточка не найдена'});
    }
    res.send('Карточка успешно удалена!');
  }catch (e){
    return res.status(500).send({message: 'Произошла ошибка на сервере'});
  }
};

const addLike = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.cardId, {$addToSet: {likes: req.user._id}}, {new: true})
    if(!card){
      return res.status(404).send({message: 'Карточка не найдена'});
    }
    res.send(card);
  }catch (e){
    return res.status(500).send({message: 'Произошла ошибка на сервере'});
  }
}

const delLike = async (req, res) => {
  try{
    const card = await Card.findByIdAndUpdate(req.params.cardId, {$pull: {likes: req.user._id}}, {new: true})
    if(!card){
      return res.status(404).send({message: 'Карточка не найдена'});
    }
    res.send(card);
  }catch (e){
    return res.status(500).send({message: 'Произошла ошибка на сервере'});
  }
}

module.exports = {
  createCard,
  getCards,
  delCardById,
  addLike,
  delLike
};
