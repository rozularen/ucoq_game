function Drawing(context) { 
	this.context = context;
}

Drawing.NAME_FONT = '14px Helvetica';
Drawing.NAME_COLOR = 'black';

Drawing.HP_COLOR = 'green';
Drawing.HP_MISSING_COLOR = 'red';

Drawing.SELF_TANK_SRC = './data/self_tank.png';
Drawing.SELF_TURRET_SRC = './data/self_turret.png';
Drawing.OTHER_TANK_SRC = './data/other_tank.png';
Drawing.OTHER_TURRET_SRC = './data/other_turret.png';
Drawing.BULLET_SRC = './data/bullet.png';
Drawing.TILE_SRC = './data/tile.png';
Drawing.TILE_SIZE = 100;

Drawing.prototype.drawTank = function(isSelf, coords, orientation,
                                      turretAngle, name, health,
                                      hasShield) {
  this.context.save();
  this.context.translate(coords[0], coords[1]);
  this.context.textAlign = 'center';
  this.context.font = Drawing.NAME_FONT;
  this.context.fillStyle = Drawing.NAME_COLOR;
  this.context.fillText(name, 0, -50);
  this.context.restore();

  this.context.save();
  this.context.translate(coords[0], coords[1]);
  for (var i = 0; i < 10; i++) {
    if (i < health) {
      this.context.fillStyle = Drawing.HP_COLOR;
      this.context.fillRect(-25 + 5 * i, -42, 5, 4);
    } else {
      this.context.fillStyle = Drawing.HP_MISSING_COLOR;
      this.context.fillRect(-25 + 5 * i, -42, 5, 4);
    }
  }     
  this.context.restore();

  this.context.save();
  this.context.translate(coords[0], coords[1]);
  this.context.rotate(orientation);
  var tank = new Image();
  if (isSelf) {
    tank.src = Drawing.SELF_TANK_SRC;
  } else {
    tank.src = Drawing.OTHER_TANK_SRC;
  }
  this.context.drawImage(tank, -tank.width / 2, -tank.height / 2);
  this.context.restore();

  this.context.save();
  this.context.translate(coords[0], coords[1]);
  this.context.rotate(turretAngle);
  var turret = new Image();
  if (isSelf) {
    turret.src = Drawing.SELF_TURRET_SRC;
  } else {
    turret.src = Drawing.OTHER_TURRET_SRC;
  }
  this.context.drawImage(turret, -turret.width / 2, -turret.height / 2);
  this.context.restore();
};

/** 
 * Draws a bullet.
 * @param {[number, number]} coords The coordinates of the center of the
 *   bullet.
 * @param {number} direction The direction of the bullet from 0 to 2 * PI
 */
Drawing.prototype.drawBullet = function(coords, direction) {
  this.context.save();
  this.context.translate(coords[0], coords[1]);
  this.context.rotate(direction);
  var bullet = new Image();
  bullet.src = Drawing.BULLET_SRC;
  this.context.drawImage(bullet, -bullet.width / 2, -bullet.height / 2);
  this.context.restore();
}

/**
 * Draws the background tiles.
 * @param {[number, number]} topLeft The coordinates of the top-leftmost
 *   point to start laying down the tiles from.
 * @param {[number, number]} bottomRight The coordinates of the
 *   bottom-rightmost point to stop laying the tiles down at.
 */
Drawing.prototype.drawTiles = function(topLeft, bottomRight) {
  this.context.save();
  var tile = new Image();
  tile.src = Drawing.TILE_SRC;
  for (var x = topLeft[0]; x < bottomRight[0]; x += Drawing.TILE_SIZE) {
    for (var y = topLeft[1]; y < bottomRight[1]; y += Drawing.TILE_SIZE) {
      this.context.drawImage(tile, x, y);
    }
  }
  this.context.restore();
}