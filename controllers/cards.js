const Card = require('../models/Card');
const ERROR_CODE = 500;
const ERROR_MESSAGE = {message: 'Ошибка по умолчанию.'};
const defResponse = (res) => {
  return res.status(ERROR_CODE).send(ERROR_MESSAGE);
}

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    const card = await new Card({name, link, owner}).save();
    if(!card){
      return res.status(400).send({message: 'Переданы некорректные данные при создании карточки.'});
    }
    res.status(200).send(card);
  }catch (e){
    if(e.name === 'ValidationError'){
      return res.status(400).send({message: 'Переданы некорректные данные при добавлении карточки.'});
    }
    defResponse();
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
    defResponse();
  }
};

const delCardById = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.cardId);
    if(!card){
      return res.status(404).send({message: 'Карточка с указанным _id не найдена.'});
    }
    res.send({message: 'Карточка успешно удалена!'});
  }catch (e){
    console.log(e.name);
    if(e.name === 'CastError'){
      return res.status(400).send({message: 'Передан некорректный _id карточки.'});
    }
    defResponse();
  }
};

const addLike = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.cardId, {$addToSet: {likes: req.user._id}}, {new: true})
    if(!req.user._id){
      return res.status(404).send({message: 'Переданы некорректные данные для постановки/снятии лайка.  '});
    }
    if(!card){
      return res.status(404).send({message: 'Передан несуществующий _id карточки.'});
    }
    res.send(card);
  }catch (e){
    if(e.name === 'CastError'){
      return res.status(400).send({message: 'Передан некорректный _id карточки.'});
    }
    defResponse();
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
    if(e.name === 'CastError'){
      return res.status(400).send({message: 'Передан некорректный _id карточки.'});
    }
    defResponse();
  }
}

module.exports = {
  createCard,
  getCards,
  delCardById,
  addLike,
  delLike
};
