require("./phaser.js");
const QUADRAT_SIZE = require("./global_constants.js").PARAMS.QUADRAT_SIZE;
const DISTANCE_UNIT = require("./global_constants.js").PARAMS.DISTANCE_UNIT;

Phaser.GameObjects.GameObjectFactory.register('quadrat', function (x, y) {
	const ex = new module.exports.Quadrat(this.scene, x, y);
	
	this.updateList.add(ex);
	[ex.square, ex.circle].forEach(value => { ex.add(value, true); });
	
	return ex;
});

module.exports.Quadrat =
	class Quadrat extends Phaser.GameObjects.Group {

		constructor(scene, x, y) {
			super(scene);

			// Quadrat Square
			let q = new Phaser.GameObjects.Rectangle(scene, x, y, QUADRAT_SIZE * DISTANCE_UNIT, QUADRAT_SIZE * DISTANCE_UNIT);
			q.setOrigin(0, 0);
			q.isStroked = true;
			q.lineWidth = 5;
			this.square = q;

			// Clickable Circle
			let c = new Phaser.GameObjects.Ellipse(scene, x, y, 30, 30, 0xFF0801);
			c.setInteractive({ draggable: true });
			c.on('drag', function (pointer, dragX, dragY) {
				c.x = dragX;
				q.x = dragX;
				c.y = dragY;
				q.y = dragY;
			});
			this.circle = c;

		}
	};