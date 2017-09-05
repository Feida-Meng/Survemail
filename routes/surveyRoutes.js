const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredit = require('../middlewares/requireCredit');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplate/surveyTemplate');

module.exports = app => {

  app.post('/api/survey', requireLogin, requireCredit, (req, res) => {
    const {title, subject, body, recipients} = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({email: email.trim()})),
      _userID: req.user.id,
      dataSend: Date.now()
    });
    // Send email
    const mailer = new Mailer(survey,surveyTemplate(survey));
    survey.save()
  });

}
