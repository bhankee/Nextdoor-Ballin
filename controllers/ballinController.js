let express = require('express');

let router = express.Router();
let teams = require('../models/teams');

router.get('/', function(req, res) {
  console.log('CONTROLLER GET FIRED!');
  teams.findAll(function(teamsData) {
    res.render('home', { team_data: teamsData });
  });
});

module.exports = router;
