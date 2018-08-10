const db = require('../models');
const passport = require('passport');

module.exports = function(app) {
  /* ----------------------------
          Google Login 
     ---------------------------- */
  // SIGNUP
  app.get('/auth/signup', function(req, res) {
    res.render('signup');
  });
  // LOGIN
  app.get('/auth/login', function(req, res) {
    res.render('login');
  });
  // LOGOUT
  app.get('/auth/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
  // AUTH GOOGLE
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile']
    })
  );
  // Google Redirect after user accepts
  // Now has code in URL
  app.get(
    '/auth/google/redirect',
    passport.authenticate('google', { failureRedirect: '/auth/login' }),
    function(req, res) {
      console.log('ON REDIRECT URL: ', req.user.user_name);
      res.redirect('/profile');
    }
  );
  /* ----------------------------
          Password Login - Local 
     ---------------------------- */

  // AUTH LOCAL
  app.post('/auth/local/signup', function(req, res) {
    console.log(req.body);
    db.User.create({
      user_name: req.body.username,
      password: req.body.password
    })
      .then(function() {
        res.redirect('/auth/login');
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
      });
  });
  app.post(
    '/login',
    function(req, res, next) {
      console.log(req.body);
      console.log('================');
      next();
    },
    passport.authenticate('local', {
      successRedirect: '/profile',
      failureRedirect: '/login', // see text
      failureFlash: true // optional, see text as well
    })
  );
};
