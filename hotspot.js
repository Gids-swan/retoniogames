class Hotspot extends Phaser.GameObjects.Ellipse {
	constructor(scene, x, y)
	{
		super(scene, x, y, 20, 20, 0xffd900);
		
		// On click do something
		this.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
			this.changeColour();
			scene.scene.start("hotspotScene");
		});
		this.scene.add.existing(this);
	}
	
	changeColour() {
		this.fillColor = 0xff0000
	}
}