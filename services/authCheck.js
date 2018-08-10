// Checks if user is logged in and returns as req.user so that handlebars can check

module.exports = (req, res, next) => {
  console.log('AUTH CHECK: ', req.user);
  if (!req.user) {
    // if not logged in
    res.redirect('/auth/login');
  } else {
    // if logged in
    return next();
  }
};
