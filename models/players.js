module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define('Player', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    last_name: {
      type: DataTypes.STRING
    },
    nick_name: {
      type: DataTypes.STRING
    }
  });

  Player.associate = function(models) {
    Player.belongsTo(models.Team, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Player;
};
