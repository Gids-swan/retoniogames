class Quadrat extends Phaser.GameObjects.Ellipse {
	//var quadrat = null;

	constructor(scene, x, y)
	{
		super(scene, x, y, 30, 30, 0xFF0000);
		
		this.quadrat = scene.add.rectangle(x, y, 250, 250);
		this.quadrat.setOrigin(0,0);
		this.quadrat.isStroked = true;
		this.quadrat.lineWidth = 5;
		this.setInteractive( { draggable: true} );
		this.on('drag', function(pointer, dragX, dragY) {
			this.x = dragX;
			this.quadrat.x = dragX;
			this.y = dragY;
			this.quadrat.y = dragY;
		});
		
		scene.add.existing(this);
	}
}