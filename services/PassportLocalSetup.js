const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const keys = require('../config/keys');
const db = require('../models');

passport.use(
  new LocalStrategy(function(username, password, done) {
    console.log('INSIDE LOCAL STRATEGY!', username);
    db.User.findOne({ where: { user_name: username } }).then(function(dbUser) {
      // If there's no user with the given email
      console.log('DBUSER: ', dbUser);
      if (!dbUser) {
        return done(null, false, {
          message: 'Incorrect email.'
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  })
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
