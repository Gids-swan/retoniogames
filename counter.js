class CounterButtonUp extends uiWidgets.TextButton {
	constructor(scene, x, y) {
		super(scene, x+50, y+35, 'arrowup', function() {console.log("up")}, scene, 0, 0, 0, 0);
		this.scene.add.existing(this);
	}
}

class CounterButtonDown extends uiWidgets.TextButton {
	constructor(scene, x, y) {
		super(scene, x+50, y+35, 'arrowdown', function() {console.log("down")}, scene, 0, 0, 0, 0);
		this.scene.add.existing(this);
	}
}

class Counter extends Phaser.GameObjects.Rectangle {
	constructor(scene, x, y, type) {
		super(scene, x, y, 120, 170, 0x785419);
		this.setOrigin(0,0);
		this.scene.add.existing(this);
		this.counterup = new CounterButtonUp(scene, x+10, y+10);
		this.counterdown = new CounterButtonDown(scene, x+10, y+90);
	}
}