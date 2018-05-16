let orm = require('../config/orm');

let teams = {
  findAll: function(cb) {
    console.log('MODEL FINDALL FIRED!');
    orm.findAll('teams', function(res) {
      cb(res);
    });
  }
};

module.exports = teams;
