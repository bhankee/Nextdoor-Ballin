let connection = require('./connection');

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
  }
};

module.exports = orm;
