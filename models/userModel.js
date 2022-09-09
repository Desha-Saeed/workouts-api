const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'please enter your email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please enter a password']
  }
});

userSchema.statics.signup = async function (email, password) {
  //validators
  if (!email || !password) {
    throw Error('all fields must be filled');
  }

  if (!validator.isEmail(email)) {
    throw Error('Enter a valid email');
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Your password is not strong enough');
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({ email: email, password: hashedPassword });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('all fields must be filled');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error('Incorrect email');
  }

  const matchingPassword = await bcrypt.compare(password, user.password);

  if (!matchingPassword) {
    throw Error('Incorrect password');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
