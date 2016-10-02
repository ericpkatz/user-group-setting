var router = require('express').Router();
var User = require('../db').models.User;
var Group = require('../db').models.Group;
module.exports = router;

router.get('/', function(req, res, next){
  User.findAll({ include: [Group]})
    .then(function(users){
      res.send(users);
    })
    .catch(next);
});

router.put('/:id', function(req, res, next){
  User.findById(req.params.id)
    .then(function(user){
      user.groupId = req.body.groupId;
      return user.save();
    })
    .then(function(user){
      res.send(user);
    })
    .catch(next);

});
