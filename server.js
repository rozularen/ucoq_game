var express = require('express');
var socket = require('socket.io');
var http = require('http');
var HashMap = require('hashmap');

var app = express();
var server = http.Server(app);
var io = socket(server);

var port = process.env.PORT || 3000;

var Player = require('./Player').Player;
var clients = new HashMap();

app.use(express.static(__dirname));
 
app.get('/juego', function() {
	console.log('Trying to load %s', __dirname + '/index.html');
	res.sendFile('index.html', { root:__dirname} );
});

app.get('/juego/*', function(req, res) {
	var file = req.params[0];

    console.log('\t :: Express :: file requested : ' + file);

    res.sendFile(__dirname + '/' + file);
});

// Socket.IO handler
io.on('connection', function(socket) {
	socket.on('new player', function(data) {
		var player = new Player(100, 100, data, socket.id);
		clients.set(socket.id, player);
		socket.emit('send-id', socket.id);
		
		io.sockets.emit('update-players', clients.values());
	});

	socket.on('move-player', function(data) {
		var player = clients.get(data.id);
		player.update(data.keyboardState);
		clients.set(socket.id, player);

		io.sockets.emit('update-players', clients.values());
	});

	socket.on('disconnect', function() {
		if (clients.has(socket.id)) {
			clients.remove(socket.id);
		}

		io.sockets.emit('update-players', clients.values());
	});
});

server.listen(port, function() {
    console.log('Listening on *:' + port);
}); 