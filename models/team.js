module.exports = function(sequelize, DataTypes) {
  var Team = sequelize.define('Team', {
    team_name: DataTypes.STRING,
    team_sport: DataTypes.STRING,
    wins: DataTypes.INTEGER,
    losses: DataTypes.INTEGER
  });

  return Team;
};
