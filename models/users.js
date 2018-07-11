module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    google_id: {
      type: DataTypes.STRING
    }
  });

  User.associate = function(models) {
    // Delete players associates with team when team is deleted.
    User.hasOne(models.Team);
  };

  return User;
};
