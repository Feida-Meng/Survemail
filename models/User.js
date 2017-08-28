const mongoose = require('mongoose');

const {Schema} = require('mongoose');
//same as const Schema = require('mongoose').Schema
const userSchema = new Schema({
  googleId: String
});

//load userSchema into mongoose and create new users collection
mongoose.model('users', userSchema);
