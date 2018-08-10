var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1],
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    }
  });
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.hook('beforeCreate', function(user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  User.associate = function(models) {
    // Delete players associates with team when team is deleted.
    User.hasOne(models.Team);
  };

  return User;
};
