module.exports = function(sequelize, DataTypes) {
  var GoogleUser = sequelize.define('GoogleUser', {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    google_id: {
      type: DataTypes.STRING
    }
  });

  GoogleUser.associate = function(models) {
    // Delete players associates with team when team is deleted.
    GoogleUser.hasOne(models.Team);
  };

  return GoogleUser;
};
