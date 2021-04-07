Phaser.GameObjects.GameObjectFactory.register('textbuttonex', function (x, y, key, callback) {
	const ex = new TextButtonEX(this.scene, x, y, key, callback, this.scene);
	
	this.displayList.add(ex);
	
	return ex;
});

Phaser.GameObjects.GameObjectFactory.register('centredtextex', function (x, y, text, style) {
	const ex = new CentredTextEX(this.scene, x, y, text, style);
	
	this.displayList.add(ex);
	
	return ex;
});

class TextButtonEX extends uiWidgets.TextButton {
	constructor(scene, x, y, key, callback, callbackContext) {
		super(scene, x, y, key, callback, callbackContext, 0, 0, 0, 0)
		this.setOrigin(0,0);
	}
	
	setDimensions(width, height) {
		this.setWidth(width);
		this.setHeight(height);
	}
	
	setWidth(width) {
		this.button.displayWidth = width;
		this.width = width;
	}
	
	setHeight(height) {
		this.button.displayHeight = height;
		this.height = height;
	}
	
	setOrigin(x, y) {
		this.button.setOrigin(x,y);
	}
}

class CentredTextEX extends Phaser.GameObjects.Text {
	constructor(scene, x, y, text, style) {
		super(scene, x, y, text, style);
		this.setAlign('center');
		this.setOrigin(0.5, 0.5);
	}
}

