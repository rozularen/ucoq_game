function Game(canvas, socket) {
    this.canvas = canvas;
    this.canvas.width = Game.WIDTH;
    this.canvas.height = Game.HEIGHT;
    this.context = this.canvas.getContext('2d');

    this.socket = socket;
    
    this.id = null;

    this.players = [];
}

Game.WIDTH = 600;
Game.HEIGHT = 600;

Game.prototype.getCanvas = function() {
    return this.canvas;
}

Game.prototype.getContext = function() {
    return this.context;
}

Game.prototype.setId = function(id) {
    this.id = id;
}

Game.prototype.receivePlayers = function(players) {
    this.players = players;
}

Game.prototype.update = function() {
    if (KeyboardBuffer.UP || KeyboardBuffer.RIGHT ||
      KeyboardBuffer.DOWN || KeyboardBuffer.LEFT) {
    this.socket.emit('move-player', {
      id: this.id,
      keyboardState: {
        up: KeyboardBuffer.UP,
        right: KeyboardBuffer.RIGHT,
        down: KeyboardBuffer.DOWN,
        left: KeyboardBuffer.LEFT
      }
    });
  }
}

Game.prototype.draw = function() {
    this.context.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);

    // Draws the player different from others
    for (var i = 0; i < this.players.length; ++i) {
        if (this.players[i].id_ == this.id) {
            Drawing.drawSelf(this.context, this.players[i]);
        } else {
            Drawing.drawOther(this.context, this.players[i]);
        }
    }
}
