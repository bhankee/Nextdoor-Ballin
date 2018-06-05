module.exports = function(sequelize, DataTypes) {
  var Team = sequelize.define('Team', {
    team_name: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    team_sport: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },

    wins: DataTypes.INTEGER,
    losses: DataTypes.INTEGER
  });

  Team.associate = function(models) {
    // Delete players associates with team when team is deleted.
    Team.hasMany(models.Player);
  };

  return Team;
};
