const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredit = require('../middlewares/requireCredit');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplate/surveyTemplate');

module.exports = app => {

  app.post('/api/survey', requireLogin, requireCredit, async (req, res) => {
    const {title, subject, body, recipients} = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({email: email.trim()})),
      _userID: req.user.id,
      dataSend: Date.now()
    });

    try {
      //create email
      const mailer = new Mailer(survey,surveyTemplate(survey));
      // Send email
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

}
