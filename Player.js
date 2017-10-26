function Player(x, y, name, id) {
	this.x = x;
	this.y = y;
	this.name = name;
	this.id = id;
};

Player.VELOCITY = 2;

Player.prototype.update = function(keyboardState) {
	if (keyboardState.up) {
    this.y -= Player.VELOCITY;
  }
  if (keyboardState.right) {
    this.x += Player.VELOCITY;
  }
  if (keyboardState.down) {
    this.y += Player.VELOCITY;
  }
  if (keyboardState.left) {
    this.x -= Player.VELOCITY;
  }
};

// Getters
Player.prototype.getX = function() {
	return this.x;
}

Player.prototype.getY = function() {
	return this.y;
}

Player.prototype.getName = function() {
	return this.name;
}

Player.prototype.getId = function() {
	return this.id;
}

// Setters
Player.prototype.setX = function(x) {
	this.x = x;
}

Player.prototype.setY = function(y) {
	this.y = y;
}

Player.prototype.setName = function(name) {
	this.name = name;
}

exports.Player = Player;