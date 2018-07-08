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

  return User;
};
