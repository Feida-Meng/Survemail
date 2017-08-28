const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GoogleOauthClientID,
      clientSecret: keys.GoogleOauthClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      //after google sending back code
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
    }
  )
);
