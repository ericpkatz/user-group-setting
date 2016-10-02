var express = require('express');
var path = require('path');
var User = require('./db').models.User;
var Group = require('./db').models.Group;

var app = express();

app.use(express.static(path.join(__dirname, '../', 'node_modules')));
app.use('/browser', express.static(path.join(__dirname, '../', 'browser')));

app.use(require('body-parser').json());

app.use(require('express-session')({ secret: process.env.SECRET}));

app.use(function(req, res, next){
  if(!req.session.userId)
    return next();
  User.findById(req.session.userId, {include: [Group]})
    .then(function(user){
      if(user)
        req.user = user;
      next();
    })
    .catch(next);
});

app.get('/', function(req, res, next){
  res.sendFile(path.join(__dirname, '../', 'browser/index.html'));
});

app.use('/api', require('./routes'));


module.exports = app;
