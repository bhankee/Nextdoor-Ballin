const db = require('../models');

const authCheck = require('../services/authCheck');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('home');
  });

  app.get('/login', function(req, res) {
    res.render('login');
  });

  // Teams route
  app.get('/teams/:user', function(req, res) {
    console.log('USER IN TEAMS: ', req.params.user);
    db.Team.findAll().then(function(dbTeam) {
      res.render('teams', {
        team_data: dbTeam
      });
    });
  });

  app.get('/my-team/:id', authCheck, function(req, res) {
    db.Team.findOne({
      where: {
        id: req.params.id
      },
      raw: true
    }).then(function(dbTeam) {
      console.log('Team: ', dbTeam);
      // console.log('PASSED INTO TEAM PAGE: ' + JSON.stringify(dbTeam));

      db.Player.findAll({
        where: {
          TeamId: dbTeam.id
        },
        raw: true
      }).then(function(dbPlayers) {
        console.log('Players: ', dbPlayers);
        res.render('myTeam', {
          myTeam: dbTeam,
          myPlayers: dbPlayers,
          user: req.user
        });
      });
    });
  });

  app.get('/team/add/:userName', authCheck, function(req, res) {
    console.log('PARAMS USERNAME: ', req.params.userName);
    res.render('addTeam', { captain: req.params.userName, user: req.user });
  });

  // Profile route when user is logged in
  app.get('/profile', authCheck, function(req, res) {
    db.Team.findOne({
      where: {
        captain: req.user.user_name
      },
      raw: true
    }).then(function(dbTeam) {
      console.log('Team: ', dbTeam);
      if (dbTeam) {
        db.Match.findAll({
          where: {
            team_two: dbTeam.team_name
          }
        }).then(function(matches) {
          res.render('profile', {
            user: req.user,
            team: dbTeam,
            match: matches
          });
        });
      } else {
        res.render('profile', {
          user: req.user
        });
      }
    });
  });
};

// Figure out how to add team linked to this profile and ...
