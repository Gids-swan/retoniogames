class CounterButtonUp extends uiWidgets.TextButton {
	constructor(scene, x, y) {
		super(scene, x+50, y+40, 'arrowup', function() {console.log("up")}, scene, 0, 0, 0, 0);
		this.scene.add.existing(this);
	}
}

class CounterButtonDown extends uiWidgets.TextButton {
	constructor(scene, x, y) {
		super(scene, x+50, y+40, 'arrowdown', function() {console.log("down")}, scene, 0, 0, 0, 0);
		this.scene.add.existing(this);
	}
}

class Counter extends 