const mongoose = require('mongoose');

const {Schema} = require('mongoose');
//same as const Schema = require('mongoose').Schema
const userSchema = new Schema({
  googleId: String
});

mongoose.model('users', userSchema); //create new users collection
