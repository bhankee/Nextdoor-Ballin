const db = require('../models');
const passport = require('passport');

module.exports = function(app) {
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
};
