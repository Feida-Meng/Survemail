const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: {type: Boolean, default: false},
  response: String,
  timeResponded: Date
})

module.exports = recipientSchema;
