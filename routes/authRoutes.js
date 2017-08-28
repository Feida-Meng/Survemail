const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
      // ask google to give permission to share profile and email
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));
};
