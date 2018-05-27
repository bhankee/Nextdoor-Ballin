let orm = require('../config/orm');

let teams = {
  findAll: function(cb) {
    orm.findAll('teams', function(res) {
      cb(res);
    });
  },
  createTeam: function(teamName, cb) {
    orm.createTeam(
      'teams',
      ['team_name', 'wins', 'losses'],
      [teamName, 0, 0],
      cb
    );
  }
};

module.exports = teams;
