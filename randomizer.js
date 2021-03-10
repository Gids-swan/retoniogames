class Randomizer extends Phaser.GameObjects.Rectangle {
	// max value is inclusive, min value is inclusive
	constructor(scene, x, y, min, max) {
		super(scene, x, y, 50, 50, 0xFFFFFF);
		this.setOrigin(0,0);
		this.scene.add.existing(this);
		
		this.countText = this.scene.add.text(x+25, y+25, -1, {'fill': '#000', 'font': '16px Courier New'});
		this.countText.setAlign('center');
		this.countText.setOrigin(0.5, 0.5);
		
		this.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
			let value = Math.floor(Math.random() * ((max+1) - min)) + min;
			this.countText.setText(value);
		});
	}
}