require("./phaser.js");
const ButtonEX = require("./UIToolExtensions.js").ButtonEX;
const CentredTextEX = require("./UIToolExtensions.js").CentredTextEX;

// Parameters
const BUTTON_WIDTH = 25;
const BG_WIDTH = 100;
const HEIGHT = 50;
const X_NUM_POSX = (BG_WIDTH / 4) + BUTTON_WIDTH;
const Y_NUM_POSX = ((3 * BG_WIDTH) / 4) + BUTTON_WIDTH;
const NUM_POSY = HEIGHT / 2;

Phaser.GameObjects.GameObjectFactory.register('randomizer', function (x, y, coordArr) {
	const ex = new module.exports.Randomizer(this.scene, x, y, coordArr);
	
	this.updateList.add(ex);
	[ex.bg, ex.leftButton, ex.rightButton, ex.countTextX, ex.countTextY].forEach(value => { 
		ex.add(value, true); 
	});
	
	return ex;
});

module.exports.Randomizer = 
class Randomizer extends Phaser.GameObjects.Group {
	constructor (scene, x, y, coordArr) {
		super(scene);

		// Background
		this.bg = new Phaser.GameObjects.Rectangle(scene, x + BUTTON_WIDTH, y, BG_WIDTH, HEIGHT, 0xFFFFFF);
		this.bg.setOrigin(0,0);

		// Buttons
		let me = this;
		this.leftButton = new ButtonEX(scene, x, y, BUTTON_WIDTH, HEIGHT, 'arrowleft', function() {me.previous(); scene.sound.play('click');});
		this.rightButton = new ButtonEX(scene, x + BUTTON_WIDTH + BG_WIDTH, y, BUTTON_WIDTH, HEIGHT, 'arrowright', function() {me.next(); scene.sound.play('click');});

		// Internal Data
		this.coords = coordArr;
		this.currentIndex = 0;

		// Text Numbers
		let font = {'fill': '#000', 'font': '16px Courier New'};
		this.countTextX = new CentredTextEX(scene, x + X_NUM_POSX, y + NUM_POSY, this.coords[0][0], font);
		this.countTextY = new CentredTextEX(scene, x + Y_NUM_POSX, y + NUM_POSY, this.coords[0][1], font);
		
	}
	
	next() {
		if (this.currentIndex + 1 < this.coords.length) {
			this.currentIndex++;
			this.countTextX.setText(this.coords[this.currentIndex][0]);
			this.countTextY.setText(this.coords[this.currentIndex][1]);
		}
	}
	
	previous() {
		if (this.currentIndex - 1 >= 0) {
			this.currentIndex--;
			this.countTextX.setText(this.coords[this.currentIndex][0]);
			this.countTextY.setText(this.coords[this.currentIndex][1]);
		}

	}
};