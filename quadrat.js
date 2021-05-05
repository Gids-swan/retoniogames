Phaser.GameObjects.GameObjectFactory.register('quadrat', function (x, y) {
	const ex = new Quadrat(this.scene, x, y);
	
	this.updateList.add(ex);
	[ex.square, ex.circle].forEach(value => { ex.add(value, true); });
	
	return ex;
});

class Quadrat extends Phaser.GameObjects.Group {

	constructor(scene, x, y)
	{
		super(scene);
		
		let q = new Phaser.GameObjects.Rectangle(scene, x, y, QUADRAT_SIZE * 50, QUADRAT_SIZE * 50);
		q.setOrigin(0,0);
		q.isStroked = true;
		q.lineWidth = 5;
		this.square = q;
		
		let c = new Phaser.GameObjects.Ellipse(scene, x, y, 30, 30, 0xFF0000);
		c.setInteractive( { draggable: true} );
		c.on('drag', function(pointer, dragX, dragY) {
			c.x = dragX;
			q.x = dragX;
			c.y = dragY;
			q.y = dragY;
		});
		this.circle = c;

	}
}