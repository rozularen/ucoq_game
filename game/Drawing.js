function Drawing() { }

Drawing.drawSelf = function(context, object) {
	context.fillStyle = 'red';
	context.fillRect(object.x - 5, object.y - 5, 10, 10);
}

Drawing.drawOther = function(context, object) {
	context.fillStyle = 'black';
	context.fillRect(object.x - 5, object.y - 5, 10, 10);
}