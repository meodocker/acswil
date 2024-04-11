const User = require('../models/userModel');
const handler = require('./../controllers/handlerController');

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Not Implemented, PLEASE USE SIGNUP!',
  });
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};

exports.getAllUsers = handler.getAll(User);
exports.getUser = handler.getOne(User);
exports.updateUser = handler.updateOne(User);
exports.deleteUser = handler.deleteOne(User);
