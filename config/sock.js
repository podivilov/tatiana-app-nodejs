var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var api = require('./api');

var conn = function() {
  server.listen(8010);

  app.get('/', function (req, res, next) {
    res.sendfile(__dirname + '/index.html');
  });
};

var fromClient = function() {

io.on('connection', function (socket) {
  socket.on('fromClient', function (data) {
    console.log(global.sessionid, data.client);
         api.setSid(global.sessionid);
         api.getRes(data.client).then(function(res){
           console.log(global.sessionid, res);
           socket.emit('fromServer', { server: res });
         });
    });
});
}
module.exports = {conn,fromClient}
