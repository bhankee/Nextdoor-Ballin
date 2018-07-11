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
    Team.hasMany(models.Player);
    Team.belongsTo(models.User);
  };

  return Team;
};
