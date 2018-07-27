const db = require('../models');
const authCheck = require('../services/authCheck');

module.exports = function(app) {
  // TEAMS
  app.get('/api/teams', function(req, res) {
    db.Team.findAll({
      include: [db.Player]
    }).then(function(dbTeam) {
      res.json(dbTeam);
    });
  });

  // Add team
  app.post('/team/create/:captain', function(req, res) {
    let captain = req.params.captain;
    console.log('CAPTAIN CREATING IN API: ', captain);

    db.Team.create({
      team_name: req.body.team_name,
      team_sport: req.body.team_sport,
      captain: captain,
      wins: 0,
      losses: 0
    }).then(function(data) {
      res.redirect('/teams/' + data.id);
    });
  });

  app.get('/teams/:id', authCheck, function(req, res) {
    db.Team.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(dbTeam) {
      const teamObject = {
        team: dbTeam,
        user: req.user
      };
      res.render('addPlayers', teamObject);
    });
  });

  // PLAYERS
  app.post('/team/update/:id', function(req, res) {
    console.log(req.body);
    db.Player.create({
      first_name: req.body.player_first_name,
      last_name: req.body.player_last_name,
      nick_name: req.body.player_nick_name,
      TeamId: req.params.id
    }).then(function(players) {
      res.redirect('/my-team/' + req.params.id);
    });
  });
  // UPDATE PLAYERS
  app.post('/team/update/:id', function(req, res) {
    db.Player.create({
      first_name: req.body.player_first_name,
      last_name: req.body.player_last_name,
      nick_name: req.body.player_nick_name,
      TeamId: req.params.id
    }).then(function(players) {
      res.redirect('/my-team/' + players.id);
    });
  });
};
