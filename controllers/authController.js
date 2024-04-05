const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const User = require('./../models/userModel');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
        message: 'User created',
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  // Check if username & password are provided
  if (!username || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // Check if username & password are valid
  const user = await User.findOne({ username }).select('+password');

  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError('Incorrect username or password', 401));
  }

  // If all good, send token back to client
  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token: token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // Get token and check the availability of it in headers
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in', 401));
  }

  // Validate the token against db
  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET,
  );

  // Check users's existence
  const refreshUser = await User.findById(decodedToken.id);
  if (!refreshUser) {
    return next(new AppError('User does not exist', 401));
  }

  // Check if the user changed their password and token changed
    if (refreshUser.changedPasswordAfter(decodedToken.iat)) {
      return next(new AppError('Your password has been changed, please login again', 401));
  
  }
  //
  next();
});
