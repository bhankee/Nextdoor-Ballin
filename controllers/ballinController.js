let express = require('express');
let router = express.Router();
let teams = require('../models/teams');

// ROUTES
// Home route
router.get('/', function(req, res) {
  res.render('home');
});
router.get('/team/add', function(req, res) {
  res.render('addTeam');
});
// Teams route
router.get('/teams', function(req, res) {
  teams.findAll(function(teamsData) {
    res.render('teams', { team_data: teamsData });
  });
});

// Add team
router.post('/team/create', function(req, res) {
  console.log('CONTROLLER TEAM NAME: ' + req.body.team_name);
  teams.createTeam(req.body.team_name, function(result) {
    console.log(result);
    res.redirect('/');
  });
});

module.exports = router;
