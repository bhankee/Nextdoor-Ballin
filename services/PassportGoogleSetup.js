const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const db = require('../models');

passport.use(
  new GoogleStrategy(
    {
      // options
      // Made in Google api dashboard for project
      callbackURL: '/auth/google/redirect',
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      //Check if user exists in database
      db.User.findOne({
        where: {
          // id should be google_id
          id: profile.id
        }
      }).then(function(currentUser) {
        if (currentUser) {
          // User already exists
          console.log('USER IS: ', currentUser);
          done(null, currentUser);
        } else {
          // Create User in Database
          db.User.create({
            user_name: profile.displayName,
            google_id: profile.id
          }).then(function(data) {
            console.log('SAVED USER: ' + JSON.stringify(data));
            done(null, data);
          });
        }
      });
    }
  )
);

//Sends user id to a cookie
passport.serializeUser(function(user, done) {
  console.log('SERIALIZE USER: ', user.id);
  return done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('Deserialize User Fired!');
  db.User.findOne({
    where: {
      id: id
    }
  }).then(function(user) {
    console.log('return from DESERIALIZE: ', user);
    return done(null, user);
  });
});

module.exports = passport;
