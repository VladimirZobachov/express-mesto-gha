const User = require('../models/User');

const createUser = async (req, res) => {
  try{
  const user = await new User(req.body).save();
  if(!user){
    return res.status(400).send({message: 'Переданы некорректные данные'});
  }
  res.status(200).send(user);
  }catch(e){
      return res.status(500).send({message: 'Произошла ошибка на сервере'});
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
    return res.status(500).send({message: 'Произошла ошибка на сервере'});
  }
};

const getUserById = async (req, res) => {
  try{
    const user = await User.findById(req.params.userId);
    if(!user){
      return res.status(404).send({message: 'пользователь не найден'});
    }
    res.send(user);
  }catch (e){
    return res.status(500).send({message: 'Произошла ошибка на сервере'});
  }
};

const updateUser = async (req, res)=>{
  try{
    const user = await User.findByIdAndUpdate(req.user._id, req.body);
    if(!user){
      return res.status(404).send({message: 'пользователь не найден'});
    }
    res.status(200).send(user);
  }catch(e){
    return res.status(500).send({message: 'Произошла ошибка на сервере'});
  }
}

const updateUserAvatar = async (req, res)=>{
  try{
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, {avatar: avatar});
    if(!user){
      return res.status(404).send({message: 'пользователь не найден'});
    }
    res.status(200).send(user);
  }catch(e){
    return res.status(500).send({message: 'Произошла ошибка на сервере'});
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar
};
