const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//fetch users comparing to load users in file User.js
const User = mongoose.model('users');
passport.serializeUser((user, done) => {
  //user object from mongodb
  done(null, user.id); //id short cut for _id object
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GoogleOauthClientID,
      clientSecret: keys.GoogleOauthClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({googleId: profile.id}).then(existingUser => {
        if (existingUser) {
          done(null, existingUser); //null means no error
        } else {
          new User({googleId: profile.id})
            .save()
            .then(savedUser => done(null, savedUser));
        }
      });
    }
  )
);
