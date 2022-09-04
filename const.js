const OK = 200;
const ERROR_CODE = 400;
const NOT_FOUND = 404;
const NOT_FOUND_PAGE_MESSAGE = { message: 'Страница не найдена' };
const ERROR_MESSAGE = { message: 'Ошибка по умолчанию.' };
const ERROR_CODE_USER_MESSAGE = { message: 'Переданы некорректные данные' };
const ERROR_CODE_USER_CREATE_MESSAGE = { message: 'Переданы некорректные данные при создании пользователя.' };
const ERROR_CODE_USER_UPDATE_MESSAGE = { message: 'Переданы некорректные данные при обновлении профиля.' };
const ERROR_CODE_AVATAR_UPDATE_MESSAGE = { message: 'Переданы некорректные данные при обновлении аватара.' };
const NOT_FOUND_USERS_MESSAGE = { message: 'Пользователи не найдены.' };
const NOT_FOUND_USER_MESSAGE = { message: 'Пользователь по указанному _id не найден.' };
const ERROR_CODE_CARD_MESSAGE = { message: 'Переданы некорректные данные' };
const ERROR_CODE_CARD_CREATE_MESSAGE = { message: 'Переданы некорректные данные при создании карточки.' };
const ERROR_CODE_CARD_UPDATE_MESSAGE = { message: 'Переданы некорректные данные при обновлении карточки.' };
const ERROR_CODE_CARD_LIKE_MESSAGE = { message: 'Переданы некорректные данные для постановки/снятии лайка.' };
const NOT_FOUND_CARDS_MESSAGE = { message: 'Карточки не найдены.' };
const NOT_FOUND_CARD_MESSAGE = { message: 'Карточка по указанному _id не найдена.' };
const OK_MESSAGE_DEL_CARD = { message: 'Карточка успешно удалена!' };

module.exports = {
  OK,
  ERROR_CODE,
  NOT_FOUND,
  ERROR_MESSAGE,
  ERROR_CODE_USER_MESSAGE,
  ERROR_CODE_USER_CREATE_MESSAGE,
  ERROR_CODE_USER_UPDATE_MESSAGE,
  ERROR_CODE_AVATAR_UPDATE_MESSAGE,
  NOT_FOUND_USERS_MESSAGE,
  NOT_FOUND_USER_MESSAGE,
  ERROR_CODE_CARD_MESSAGE,
  ERROR_CODE_CARD_CREATE_MESSAGE,
  ERROR_CODE_CARD_UPDATE_MESSAGE,
  NOT_FOUND_CARDS_MESSAGE,
  NOT_FOUND_CARD_MESSAGE,
  OK_MESSAGE_DEL_CARD,
  ERROR_CODE_CARD_LIKE_MESSAGE,
  NOT_FOUND_PAGE_MESSAGE,
};
