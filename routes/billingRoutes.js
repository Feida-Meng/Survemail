const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {

    try{
      const charge = await stripe.charges.create({
        amount: 500,
        currency: "usd",
        source: req.body.id,
        description: `Charged ${req.body.card.name} $5 for 5 credits`
      });
    } catch (e) {
      return res.status(400).send(e);
    }

    req.user.credits += 5;
    
    try {
      const user = await req.user.save();
      res.send(user);
    } catch (e) {
      res.status(400).send(e);
    }

  });
}
