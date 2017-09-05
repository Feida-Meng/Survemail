const sendGrid = require('sendgrid');
const helper = sendGrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({subject, recipients}, content) {
    super();
    this.sgApi = sendGrid(keys.sendGridKey);
    this.from_email = new helper.Email('no-reply@survemail.com')
    this.recipients = this.formatAddresses(recipients);
    this.subject = subject;
    this.body = new helper.Content('text/html',content);

    this.addContent(this.body); //addContent is from helper.mail
    this.addClickTracking();
    this.addRecipients();
  }

  addRecipients() {
    const personalize = new helper.personalization();
    this.recipients.forEach( recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize); // from mail class
  }

  formatAddresses(recipients) {
    return recipients.map( recipient => {
      return new helper.Email(recipient.email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.clickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  async send(){
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path:'/v3/mail/send',
      body: this.toJSON()
    });

    const response = this.sgApi.API(request);
    return response;
  }

}

module.exports = Mailer;
