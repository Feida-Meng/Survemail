const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');

const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredit = require('../middlewares/requireCredit');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplate/surveyTemplate');
// _.mapValues({ 'a': 1, 'b': 2, 'c': 3} , function(num) { return num * 3; });
module.exports = app => {

  app.post('/api/surveys/webhooks',(req, res) => {
    console.log('req',req);
    const p = new Path('/api/surveys/:surveyId/:choice/acknowledge');

    const events = _.chain(req.body).map(event => {
      if ( p.test(new URL(event.url).pathname) ) {
        return {choice: match.choice, surveyId: match.surveyId, email: event.email};
      }
    })
    .compact()
    .uniqBy('surveyId')
    .value();

  });


  app.post('/api/surveys', requireLogin, requireCredit, async (req, res) => {
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

  app.get('/api/surveys/:id/yes/acknowledge', (req, res) => {
    res.send('Thank you for taking the survey');
  });

  app.get('/api/surveys/:id/no/acknowledge', (req, res) => {
    res.send('Thank you for taking the survey');
  });

}
