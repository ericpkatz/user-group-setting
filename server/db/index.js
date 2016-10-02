var db = require('./_db');

var User = require('./user');
var Group = require('./group');

User.belongsTo(Group);

function sync(){
  return db.sync({ force: true });
}

function seed(){
  return Promise.all([
    User.create({ username: 'mgreen', firstName: 'moe', lastName: 'green', password: 'foo'}),
    User.create({ username: 'lblue', firstName: 'larry', lastName: 'blue', password: 'bar' }),
    Group.create({ name: 'developers'}),
    Group.create({ name: 'admin'}),
    Group.create({ name: 'HR'}),
  ])
  .then(function(result){
    result[1].groupId = result[2].id;
    result[0].groupId = result[3].id;
    return Promise.all([
        result[1].save(),
        result[0].save()
    ]);
  });
}

function syncAndSeed(){
  return sync()
    .then(seed);

}

module.exports = {
  models: {
    Group: Group,
    User: User
  },
  sync: sync,
  seed: seed,
  syncAndSeed: syncAndSeed
};
