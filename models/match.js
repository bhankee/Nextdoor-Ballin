module.exports = function(sequelize, DataTypes) {
  var Match = sequelize.define('Match', {
    team_one: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    team_two: {
      type: DataTypes.STRING
    },
    winner: {
      type: DataTypes.STRING
    }
  });

  return Match;
};
