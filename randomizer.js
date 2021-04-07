class Randomizer extends Phaser.GameObjects.Rectangle {
	// max value is inclusive, min value is inclusive
	constructor(scene, x, y) {
		super(scene, x, y, 100, 50, 0xFFFFFF);
		this.setOrigin(0,0);
		this.scene.add.existing(this);
		
		this.countTextX = this.scene.add.text(x+25, y+25, -1, {'fill': '#000', 'font': '16px Courier New'});
		this.countTextX.setAlign('center');
		this.countTextX.setOrigin(0.5, 0.5);
		
		this.countTextY = this.scene.add.text(x+75, y+25, -1, {'fill': '#000', 'font': '16px Courier New'});
		this.countTextY.setAlign('center');
		this.countTextY.setOrigin(0.5, 0.5);
		
		this.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
			let valueX = Math.floor(Math.random() * ((GRID_X_MAX+1) - 0)) + 0;
			this.countTextX.setText(valueX);
			
			let valueY = Math.floor(Math.random() * ((GRID_Y_MAX+1) - 0)) + 0;
			this.countTextY.setText(valueY);
		});
	}
}