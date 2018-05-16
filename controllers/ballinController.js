let express = require('express');
let router = express.Router();
let teams = require('../models/teams');

// ROUTES
// Home route
router.get('/', function(req, res) {
  res.render('home');
});
// Teams route
router.get('/teams', function(req, res) {
  teams.findAll(function(teamsData) {
    res.render('teams', { team_data: teamsData });
  });
});

module.exports = router;
