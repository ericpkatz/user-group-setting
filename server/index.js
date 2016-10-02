var server = require('http').createServer(require('./app'));

var port = process.env.PORT || 3000;

if(process.env.SYNC){
  require('./db').syncAndSeed();
}

server.listen(port, function(){
  console.log('listening on port ' + port);
});
