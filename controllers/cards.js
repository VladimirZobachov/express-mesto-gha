const Card = require('../models/Card');
const { NotFoundError } = require('../errorsClasses/NotFoundError');

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const ref = req.user._id;
    const card = await new Card({ name, link, ref }).save();
    return res.send(card);
  } catch (err) {
    return next(err);
  }
};

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    if (!cards) {
      throw new NotFoundError('Ничего не найдено');
    }
    return res.send(cards);
  } catch (err) {
    return next(err);
  }
};

const delCardById = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.cardId);
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    return res.send('Карточка удалена');
  } catch (err) {
    return next(err);
  }
};

const addLike = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!req.user._id) {
      throw new NotFoundError('Пользователь не найден');
    }
    if (!card) {
      throw new NotFoundError('Карточна не найдена');
    }
    return res.send(card);
  } catch (err) {
    return next(err);
  }
};

const delLike = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Карточна не найдена');
    }
    return res.send(card);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createCard,
  getCards,
  delCardById,
  addLike,
  delLike,
};
