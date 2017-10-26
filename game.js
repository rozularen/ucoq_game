var UUID = require('node-uuid');

var io;
var client;

/**
 * This function is called by server.js to initialize a new game instance.
 *
 * @param sio The Socket.IO library
 * @param socket The socket object for the connected client.
 */
exports.initGame = function(sio, socket) {
    io = sio;
    client = socket;

	client.id = UUID();
    
    client.emit('connected', { id : socket.id } );
    
    console.log('User: ' + socket.id + ' connected.');

    // -------------------


};
