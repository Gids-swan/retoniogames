require("./phaser.js");
const GAME_PADDING = require("./global_constants").DISPLAY.GAME_PADDING;
const PADDED_GAME_WIDTH = require("./global_constants").DISPLAY.PADDED_GAME_WIDTH;

Phaser.GameObjects.GameObjectFactory.register('gamearea', function () {
	const ex = new module.exports.GameArea(this.scene); // Use module.exports.GameArea in these register functions
	
	this.displayList.add(ex);
	
	return ex;
});

module.exports.GameArea = 
class GameArea extends Phaser.GameObjects.Container {
	constructor (scene) {
		super(scene, GAME_PADDING, GAME_PADDING);
	}
};

Phaser.GameObjects.GameObjectFactory.register('uiarea', function () {
	const ex = new module.exports.UIArea(this.scene);
	
	this.displayList.add(ex);
	
	return ex;
});

module.exports.UIArea = 
class UIArea extends Phaser.GameObjects.Container {
	constructor (scene) {
		super(scene, PADDED_GAME_WIDTH, 0);
	}
};