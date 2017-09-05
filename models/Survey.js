
const mongoose = require('mongoose');
const { Schema } = mongoose;
const recipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [recipientSchema],
  yes: { type: Number, default: 0},
  no: { type: Number, default: 0},
  _userID: { type: Schema.Types.ObjectId, ref: 'User'},
  dataSend: Date,
  lastResponded: Date

});

mongoose.model('surveys',surveySchema);