var socket = io();
var game = new Game();

socket.on('connected', function(data) {
  console.log('Connected successfully to the socket.io server. My server side UUID is: ' + data.id);
});
