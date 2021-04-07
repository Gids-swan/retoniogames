class Randomizer extends Phaser.GameObjects.Rectangle {
	// max value is inclusive, min value is inclusive
	constructor(scene, x, y) {
		super(scene, x, y, 100, 50, 0xFFFFFF);
		this.setOrigin(0,0);
		this.scene.add.existing(this);
		
		this.values = [];
		for (let i = 0; i < QUADRAT_CHECKS_PER_HOTSPOT; i++) {
			this.values.push(this.generateCoords());
		}
		this.currentIndex = 0;
		
		{
			let me = this;
			this.leftButton = new RandomizerButtonLeft(scene, 25, me);
			this.rightButton = new RandomizerButtonRight(scene, 25, me);
		}
		
		this.countTextX = this.scene.add.centredtextex(x+25, y+25, this.values[0][0], {'fill': '#000', 'font': '16px Courier New'});
		this.countTextY = this.scene.add.centredtextex(x+75, y+25, this.values[0][1], {'fill': '#000', 'font': '16px Courier New'});
	}
	
	generateCoords() {
		let coords = [-1, -1];
		coords[0] = Math.floor(Math.random() * ((GRID_X_MAX+1) - 0)) + 0;
		coords[1] = Math.floor(Math.random() * ((GRID_Y_MAX+1) - 0)) + 0;
		return coords;
	}
	
	next() {
		if (this.currentIndex + 1 < this.values.length) {
			this.currentIndex++;
			this.countTextX.setText(this.values[this.currentIndex][0]);
			this.countTextY.setText(this.values[this.currentIndex][1]);
		}
	}
	
	previous() {
		if (this.currentIndex - 1 >= 0) {
			this.currentIndex--;
			this.countTextX.setText(this.values[this.currentIndex][0]);
			this.countTextY.setText(this.values[this.currentIndex][1]);
		}
	}
}

class RandomizerButtonLeft extends TextButtonEX {
	constructor(scene, width, randomizer) {
		super(scene, randomizer.x - width, randomizer.y, 'arrowleft', function() {randomizer.previous(); scene.sound.play('click');}, scene);
		this.setDimensions(width, randomizer.height);
	}
}

class RandomizerButtonRight extends TextButtonEX {
	constructor(scene, width, randomizer) {
		super(scene, randomizer.x + randomizer.width, randomizer.y, 'arrowright', function() {randomizer.next(); scene.sound.play('click');}, scene);
		this.setDimensions(width, randomizer.height);
	}
}