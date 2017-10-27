function Environment(viewPort, drawing) {
	this.viewPort = viewPort;
	this.drawing = drawing;
}

Environment.prototype.draw = function() {
	var center = this.viewPort.selfCoords;
	this.drawing.drawTiles(
		this.viewPort.toCanvasCoords({
			x: Math.max(Math.floor((center[0] - Game.WIDTH / 2) / 100) * 100, 0),
			y: Math.max(Math.floor((center[1] - Game.HEIGHT / 2) / 100) * 100, 0)
		}),
		this.viewPort.toCanvasCoords({x : 2500, y : 2500})
	);
};