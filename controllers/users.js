const User = require('../models/User');
const ERROR_CODE = 500;
const ERROR_MESSAGE = {message: 'Ошибка по умолчанию.'};
const defResponse = (res) => {
  return res.status(ERROR_CODE).send(ERROR_MESSAGE);
}

const createUser = async (req, res) => {
  try{
  const user = await new User(req.body).save();
  if(!user){
    return res.status(400).send({message: 'Переданы некорректные данные при создании пользователя.'});
  }
  res.status(200).send(user);
  }catch(e){
    if(e.name === 'ValidationError'){
      return res.status(400).send({message: 'Переданы некорректные данные при создании пользователя.'});
    }
    defResponse(res);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if(!users){
      return res.status(404).send({message: 'пользователи не найдены'});
    }
    res.send(users);
  }catch(e){
    defResponse(res);
  }
};

const getUserById = async (req, res) => {
  try{
    const user = await User.findById(req.params.userId);
    if(!user){
      return res.status(404).send({message: 'Пользователь по указанному _id не найден.'});
    }
    res.send(user);
  }catch (e){
    if(e.name === 'CastError'){
      return res.status(400).send({message: 'Передан не корректный _id пользователя.'});
    }
    defResponse(res);
  }
};

const updateUser = async (req, res)=>{
  try{
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, {name: name, about: about});
    const userUpdate = await User.findById(req.user._id);
    if(!name || !about){
      return res.status(400).send({message: 'Переданы некорректные данные при обновлении профиля.'});
    }
    if(!user){
      return res.status(404).send({message: 'Пользователь с указанным _id не найден.'});
    }
    res.status(200).send(userUpdate);
  }catch(e){
    if(e.name === 'ValidationError'){
      return res.status(400).send({message: 'Переданы некорректные данные при обновлении профиля.'});
    }
    defResponse(res);
  }
}

const updateUserAvatar = async (req, res)=>{
  try{
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, {avatar: avatar});
    const userUpdate = await User.findById(req.user._id);
    if(!avatar){
      return res.status(400).send({message: 'Переданы некорректные данные при обновлении аватара.'});
    }
    if(!user){
      return res.status(404).send({message: 'Пользователь с указанным _id не найден.'});
    }
    res.status(200).send(userUpdate);
  }catch(e){
    defResponse(res);
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar
};
