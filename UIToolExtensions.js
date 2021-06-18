require("./phaser.js");

Phaser.GameObjects.GameObjectFactory.register('buttonex', function (x, y, width, height,  key, callback) {
	const ex = new module.exports.ButtonEX(this.scene, x, y, width, height, key, callback);
	
	this.displayList.add(ex);
	
	return ex;
});

Phaser.GameObjects.GameObjectFactory.register('textbuttonex', function constructor(x, y, width, height, text, callback) {
	const ex = new module.exports.TextButtonEX(this.scene, x, y, width, height, text, callback);
	
	this.updateList.add(ex);
	[ex.bg, ex.txt].forEach(value => { 
		ex.add(value, true); 
	});
	
	return ex;
});

Phaser.GameObjects.GameObjectFactory.register('centredtextex', function (x, y, text, style) {
	const ex = new module.exports.CentredTextEX(this.scene, x, y, text, style);
	
	this.displayList.add(ex);
	
	return ex;
});

Phaser.GameObjects.GameObjectFactory.register('gridlineex', function constructor(x, y, p1x, p1y, p2x, p2y) {
	const ex = new module.exports.GridLineEX(this.scene, x, y, p1x, p1y, p2x, p2y);
	
	this.displayList.add(ex);
	
	return ex;
});

Phaser.GameObjects.GameObjectFactory.register('popup', function constructor(x, y, width, height) {
	const ex = new module.exports.PopupEX(this.scene, x, y, width, height);
	
	this.updateList.add(ex);
	[ex.bg, ex.title, ex.desc, ex.exit].forEach(value => { 
		ex.add(value, true); 
	});
	
	return ex;
});

module.exports.ButtonEX = 
class ButtonEX extends Phaser.GameObjects.Image {
	constructor(scene, x, y, width, height, key, callback) {
		super(scene, x, y, key)
		this.setDisplaySize(width, height);
		this.setOrigin(0,0);
		
		this.setInteractive().on('pointerdown', callback);
	}
}

module.exports.TextButtonEX = 
class TextButtonEX extends Phaser.GameObjects.Group {
	constructor(scene, x, y, width, height, text, callback) {
		super(scene);
		
		let font = {'fill': '0xffffff', 'font': '16px Courier New'};
		
		let bg = new Phaser.GameObjects.Rectangle(scene, x, y, width, height, 0xCCCCCC);
		bg.setOrigin(0,0);
		this.bg = bg;
		
		this.txt = new module.exports.CentredTextEX(scene, x + (width/2), y + (height/2), text, font);
		
		this.bg.setInteractive().on('pointerdown', callback);
	}
	
	setBackgroundColour(hex) {
		this.bg.setFillStyle(hex);
	}
	
	setBackgroundColour(hex, alpha) {
		this.bg.setFillStyle(hex, alpha);
	}
	
	setTextColour(hex) {
		this.txt.setColor(hex);
	}
}

module.exports.CentredTextEX = 
class CentredTextEX extends Phaser.GameObjects.Text {
	constructor(scene, x, y, text, style) {
		super(scene, x, y, text, style);
		this.setAlign('center');
		this.setOrigin(0.5, 0.5);
	}
}

module.exports.GridLineEX = 
class GridLineEX extends Phaser.GameObjects.Line {
	constructor(scene, x, y, p1x, p1y, p2x, p2y) {
		super(scene, x, y, p1x, p1y, p2x, p2y, 0x000000, 0.4);
		this.setOrigin(0,0);
		this.lineWidth = 1;
	}
}

module.exports.PopupEX = 
class PopupEX extends Phaser.GameObjects.Group {
	constructor(scene, x, y, width, height) {
		super(scene);
		let font = {'fill': '0xffffff', 'font': '16px Courier New'};
		
		let bg = new Phaser.GameObjects.Rectangle(scene, x, y, width, height, 0xCCCCCC);
		bg.setOrigin(0,0);
		this.bg = bg;

		let title = new module.exports.CentredTextEX(scene, x + (width/2), y + 5, "Title", font);
		title.setOrigin(0.5, 0);
		title.setWordWrapWidth(width, true);
		this.title = title;
		
		let desc = new module.exports.CentredTextEX(scene, x + (width/2), y + 35, "Desc", font);
		desc.setOrigin(0.5, 0);
		desc.setWordWrapWidth(width, true);
		this.desc = desc;
		
		let me = this;
		let exit = new module.exports.ButtonEX(scene, x+width-30, y, 30, 30, 'closeBtn', function() {
			me.close();
		});
		this.exit = exit;
	}
	
	setTitleText(txt) {
		this.title.setText(txt);
	}
	
	setDescriptionText(txt) {
		this.desc.setText(txt);
	}
	
	close() {
		let me = this;
		me.getChildren().forEach(value => { 
				me.killAndHide(value);
		});
	}
	
	open() {
		this.getChildren().forEach(value => { 
				value.setActive(true).setVisible(true);
		});
	}
}