Phaser.GameObjects.GameObjectFactory.register('gamearea', function () {
	const ex = new GameArea(this.scene);
	
	this.displayList.add(ex);
	
	return ex;
});

class GameArea extends Phaser.GameObjects.Container {
	constructor (scene) {
		super(scene, GAME_PADDING, GAME_PADDING);
	}
}

Phaser.GameObjects.GameObjectFactory.register('uiarea', function () {
	const ex = new UIArea(this.scene);
	
	this.displayList.add(ex);
	
	return ex;
});

class UIArea extends Phaser.GameObjects.Container {
	constructor (scene) {
		super(scene, PADDED_GAME_WIDTH, 0);
	}
}