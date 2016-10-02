var router = require('express').Router();
var User = require('../db').models.User;

module.exports = router;


router.get('/', function(req, res, next){
  if(req.user)
    return res.send(req.user);
  res.sendStatus(401);
});

router.delete('/', function(req, res, next){
  req.session.destroy();
  res.sendStatus(200);
});

router.post('/', function(req, res, next){
  User.findOne({ where: { username: req.body.username, password: req.body.password }})
    .then(function(user){
      if(user){
        req.session.userId = user.id;
        return res.send(user);
      }
      res.sendStatus(401);
    })
    .catch(next);
});
