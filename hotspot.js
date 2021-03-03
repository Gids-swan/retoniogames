class Hotspot extends Phaser.GameObjects.Ellipse {
	
	constructor(scene, x, y)
	{
		super(scene, x, y, 20, 20, 0xffd900);
		
		// On click do something
		this.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
			this.changeColour();
			scene.scene.start("hotspotScene", { hotspotClicked : this });
		});
		this.scene.add.existing(this);
		
		this.flowerData = [];
		for (let i = 0; i < 10; i++) {
			this.flowerData.push(FlowerData.generateRandomFlower());
			console.log(this.flowerData[i].type);
		}
	}
	
	changeColour() {
		this.fillColor = 0xff0000
	}
}