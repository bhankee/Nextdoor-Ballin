const db = require('../models');

const authCheck = (req, res, next) => {
  if (!req.user) {
    // if not logged in
    res.redirect('/auth/login');
  } else {
    // if logged in
    next();
  }
};

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('home');
  });

  app.get('/login', function(req, res) {
    res.render('login');
  });

  // Teams route
  app.get('/teams', function(req, res) {
    db.Team.findAll().then(function(dbTeam) {
      res.render('teams', {
        team_data: dbTeam
      });
    });
  });

  app.get('/my-team/:id', function(req, res) {
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
          myPlayers: dbPlayers
        });
      });
    });
  });

  app.get('/team/add', function(req, res) {
    res.render('addTeam');
  });

  // Profile route when user is logged in
  app.get('/profile', authCheck, function(req, res) {
    console.log('req body: ', req.user.user_name);
    res.render('profile', {
      user: req.user
    });
  });
};

// Figure out how to add team linked to this profile and ...
