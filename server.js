var PORT_NUMBER = process.env.PORT || 3000;
var FRAME_RATE = 1000.0 / 60.0;

var express = require('express');
var http = require('http');
var socket = require('socket.io');
var Game = require('./server/Game.js');

var game = new Game();

var app = express();
var server = http.Server(app);
var io = socket(server);

app.set('port', PORT_NUMBER);

app.use(express.static(__dirname));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

app.get('/*', function(req, res) {
	res.sendFile(__dirname + '/public' + req.path);
});
// Socket.IO handler
io.on('connection', function(socket) {
  // When a new player joins, the server sends his/her unique ID back so
  // for future identification purposes.
  socket.on('new-player', function(data) {
    game.addNewPlayer(data.name, socket.id);
    socket.emit('send-id', {
      id: socket.id,
      players: game.getPlayers()
    });
  });

  socket.on('move-player', function(data) {
    game.updatePlayer(socket.id, data.keyboardState, data.turretAngle);
  });

  // TODO: player shooting sound and explosion animations
  socket.on('fire-bullet', function() {
    game.addProjectile(socket.id);
  });

  // TODO: player disconnect explosion animation?
  socket.on('disconnect', function() {
    game.removePlayer(socket.id);
  });
});

setInterval(function() {
  game.update(io);
}, FRAME_RATE);

server.listen(PORT_NUMBER, function() {
    console.log('Listening on *:' + PORT_NUMBER);
}); 