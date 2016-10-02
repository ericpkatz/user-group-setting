var db = require('./_db');
var Group = db.define('group', {
  name: {
    type: db.Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Group;
