const mongoose = require('mongoose');

const UserModel = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  }
);

module.exports = mongoose.model('user', UserModel, 'users');
