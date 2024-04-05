const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required!'],
  },
  email: {
    type: String,
    required: [true, 'Email is required!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    unique: true,
  },
  photo: String,
  password: { type: String, required: [true, 'Password is required!'] },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!'],
    validator: function (value) {
      return value === this.password;
    },
    message: 'Passwords do not match!',
  },
  passwordChangedAt: Date,
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 10
  this.password = await bcrypt.hash(this.password, 10);

  // Remove password from the document
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.comparePassword = async function (
  inputPassword,
  userPassword,
) {
  return await bcrypt.compare(inputPassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    // console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }
  // Return False flag means the password has not changed
  return false;
};

const User = mongoose.model('user', userSchema);

module.exports = User;
