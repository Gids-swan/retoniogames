Phaser.GameObjects.GameObjectFactory.register('randomizer', function (x, y, coordArr) {
	const ex = new Randomizer(this.scene, x, y, coordArr);
	
	this.updateList.add(ex);
	[ex.bg, ex.leftButton, ex.rightButton, ex.countTextX, ex.countTextY].forEach(value => { 
		ex.add(value, true); 
	});
	
	return ex;
});

class Randomizer extends Phaser.GameObjects.Group {
	constructor (scene, x, y, coordArr) {
		super(scene);
		
		this.bg = new Phaser.GameObjects.Rectangle(scene, x+25, y, 100, 50, 0xFFFFFF);
		this.bg.setOrigin(0,0);
		
		let me = this;
		this.leftButton = new ButtonEX(scene, x, y, 25, 50, 'arrowleft', function() {me.previous(); scene.sound.play('click');});
		this.rightButton = new ButtonEX(scene, x + 125, y, 25, 50, 'arrowright', function() {me.next(); scene.sound.play('click');});
		this.coords = coordArr;
		this.currentIndex = 0;
		
		let font = {'fill': '#000', 'font': '16px Courier New'};
		this.countTextX = new CentredTextEX(scene, x+50, y+25, this.coords[0][0], font);
		this.countTextY = new CentredTextEX(scene, x+100, y+25, this.coords[0][1], font);
		

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
}