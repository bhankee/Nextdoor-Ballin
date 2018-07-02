const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

passport.use(
  new GoogleStrategy(
    {
      // options
      // Made in Google api dashboard for project
      callbackURL: 'http://localhost:8000/auth/google/redirect',
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      //passport callback function
      console.log('Passport callback Fired!');
      console.log(profile);
    }
  )
);
