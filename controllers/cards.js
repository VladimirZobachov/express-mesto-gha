const Card = require('../models/Card');
const { NotFoundError } = require('../errorsClasses/NotFoundError');
const { ForbiddenError } = require('../errorsClasses/ForbiddenError');
const { ValidationError } = require('../errorsClasses/ValidationError');

const createCard = async (req, res, next) => {
  const owner = req.user._id;
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner });
    return res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ValidationError('Некорректные данные при создании карточки'));
    }
    return next(err);
  }
};

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    return res.send(cards);
  } catch (err) {
    return next(err);
  }
};

const delCardById = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    if (card.owner.toString() === req.user._id) {
      await card.remove();
      return res.send({ message: 'Карточка удалена' });
    }
    return next(new ForbiddenError('Это не ваша карточка'));
  } catch (err) {
    return next(err);
  }
};

const addLike = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
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

const delLike = async (req, res, next) => {
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
