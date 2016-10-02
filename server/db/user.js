var db = require('./_db');
var User = db.define('user', {
  username: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  firstName: {
    type: db.Sequelize.STRING,
  },
  lastName: {
    type: db.Sequelize.STRING,
  }
});

module.exports = User;
