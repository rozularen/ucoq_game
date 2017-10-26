var express = require('express');
var socket = require('socket.io');
var http = require('http');

var game = require('./game.js');

var app = express();
var server = http.Server(app);
var io = socket(server);

var port = process.env.PORT || 3000;

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
    game.initGame(io, socket);
});

server.listen(port, function() {
    console.log('Listening on *:' + port);
}); 