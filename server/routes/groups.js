var router = require('express').Router();
var Group = require('../db').models.Group;

module.exports = router;

router.get('/', function(req, res, next){
  Group.findAll()
    .then(function(groups){
      res.send(groups);
    })
    .catch(next);
});
