const Card = require('../models/Card');
const {
  OK,
  ERROR_CODE,
  NOT_FOUND,
  ERROR_MESSAGE,
  ERROR_CODE_CARD_MESSAGE,
  ERROR_CODE_CARD_CREATE_MESSAGE,
  NOT_FOUND_CARDS_MESSAGE,
  NOT_FOUND_CARD_MESSAGE,
  OK_MESSAGE_DEL_CARD,
  ERROR_CODE_CARD_LIKE_MESSAGE,

} = require('../utils/const');

const defResponse = (res) => res.status(ERROR_CODE).send(ERROR_MESSAGE);

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const ref = req.user._id;
    const card = await new Card({ name, link, ref }).save();
    return res.status(OK).send(card);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(ERROR_CODE).send(ERROR_CODE_CARD_CREATE_MESSAGE);
    }
    return defResponse();
  }
};

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    if (!cards) {
      return res.status(NOT_FOUND).send(NOT_FOUND_CARDS_MESSAGE);
    }
    return res.send(cards);
  } catch (e) {
    return defResponse();
  }
};

const delCardById = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.cardId);
    if (!card) {
      return res.status(NOT_FOUND).send(NOT_FOUND_CARD_MESSAGE);
    }
    return res.send(OK_MESSAGE_DEL_CARD);
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(ERROR_CODE).send(ERROR_CODE_CARD_MESSAGE);
    }
    return defResponse();
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
      return res.status(NOT_FOUND).send(ERROR_CODE_CARD_LIKE_MESSAGE);
    }
    if (!card) {
      return res.status(NOT_FOUND).send(NOT_FOUND_CARD_MESSAGE);
    }
    return res.send(card);
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(ERROR_CODE).send(ERROR_CODE_CARD_MESSAGE);
    }
    return defResponse();
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
      return res.status(NOT_FOUND).send(NOT_FOUND_CARD_MESSAGE);
    }
    return res.send(card);
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(ERROR_CODE).send(ERROR_CODE_CARD_MESSAGE);
    }
    return defResponse();
  }
};

module.exports = {
  createCard,
  getCards,
  delCardById,
  addLike,
  delLike,
};
