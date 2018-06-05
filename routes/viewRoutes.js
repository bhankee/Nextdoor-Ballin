const db = require('../models');
module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('home');
  });

  app.get('/team/add', function(req, res) {
    res.render('addTeam');
  });
  app.get('/login', function(req, res) {
    res.render('login');
  });

  // Teams route
  app.get('/teams', function(req, res) {
    db.Team.findAll().then(function(dbTeam) {
      res.render('teams', { team_data: dbTeam });
    });
  });

  app.get('/my-team/:id', function(req, res) {
    db.Team.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(dbTeam) {
      res.render('myTeam', { myTeam: dbTeam });
    });
  });
};
