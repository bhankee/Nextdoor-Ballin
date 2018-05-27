let connection = require('./connection');

function questionMarks(num) {
  var marks = [];

  for (var i = 0; i < num; i++) {
    marks.push('?');
  }

  return marks.toString();
}

// ORM FUNCTIONS
let orm = {
  findAll: function(table, cb) {
    var querySearch = 'SELECT * FROM ' + table + ';';
    connection.query(querySearch, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  createTeam: function(table, cols, vals, cb) {
    var queryToSearch = 'INSERT INTO ' + table;
    queryToSearch += ' (';
    queryToSearch += cols.toString();
    queryToSearch += ') ';
    queryToSearch += 'VALUES (';
    queryToSearch += questionMarks(vals.length);
    queryToSearch += ') ';

    connection.query(queryToSearch, vals, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

module.exports = orm;
