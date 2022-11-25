const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userModel = new Schema({
  email: String,
  name: String,
  password: String,
  description: {type: String, default: 'You have not changed your description yet :/'},
});

const User = mongoose.model('User', userModel)

module.exports = User