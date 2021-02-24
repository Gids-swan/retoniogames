class Flower extends Phaser.GameObjects.Image {
	
	constructor(scene, x, y)
	{
		super(scene, x, y, 'flower');
		this.displayWidth = 25;
		this.displayHeight = 25;
		this.setOrigin(0,0);
		this.scene.add.existing(this);
	}
}