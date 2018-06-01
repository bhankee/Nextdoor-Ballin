// Our Burger controller
// =====================
// This file uses Sequelize to manage data manipulation
// for all apropos http requests.
// NOTE: This is the same file from last week's homework,
// but with each route gutted and replaced with sequelize queries
// where references to our outmoded ORM file once sat.
var express = require('express');

var router = express.Router();
// edit burger model to match sequelize
var db = require('../models/');

// get route -> index
router.get('/', function(req, res) {
  console.log('GET REUEST FOR HOME SCREEN FIRED!');
  res.render('home');
});

router.get('/team/add', function(req, res) {
  res.render('addTeam');
});
router.get('/login', function(req, res) {
  res.render('login');
});
router.get('/players/add', function(req, res) {
  console.log('REQ: ' + req);
  console.log('RES: ' + res);
  res.render('addPlayers');
});
// Teams route
router.get('/teams', function(req, res) {
  db.Team.findAll().then(function(dbTeam) {
    console.log('DB TEAM: ' + dbTeam);
    res.render('teams', { team_data: dbTeam });
  });
});
// Add team
router.post('/team/create', function(req, res) {
  console.log('CONTROLLER TEAM NAME: ' + req.body.team_name);
  console.log('CONTROLLER TEAM SPORT: ' + req.body.team_sport);
  db.Team.create({
    team_name: req.body.team_name,
    team_sport: req.body.team_sport,
    wins: 0,
    losses: 0
  });
});
// Add player
router.post('/players/create', function(req, res) {
  console.log('CONTROLLER PLAYER FIRST NAME: ' + req.body.player_first_name);
  console.log('CONTROLLER PLAYER LAST NAME: ' + req.body.player_last_name);
  teams.addPlayer(
    req.body.player_first_name,
    req.body.player_last_name,
    function(result) {
      console.log(result);
      // add to redirect to team id
      res.redirect('/');
    }
  );
});

module.exports = router;
