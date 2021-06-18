require("./phaser.js");
const FlowerData = require("./flower.js").FlowerData;
const CentredTextEX = require("./UIToolExtensions.js").CentredTextEX;
const GLOBAL = require("./global_constants");
const GAME_WIDTH = GLOBAL.DISPLAY.GAME_WIDTH;
const MAX_FPH = GLOBAL.PARAMS.MAX_FLOWERS_PER_HOTSPOT;
const MIN_FPH = GLOBAL.PARAMS.MIN_FLOWERS_PER_HOTSPOT;
const QUADRAT_SIZE = GLOBAL.PARAMS.QUADRAT_SIZE;
const GRID_X_MAX = GLOBAL.PARAMS.GRID_X_MAX;
const GRID_Y_MAX = GLOBAL.PARAMS.GRID_Y_MAX;
const QUADRAT_CHECKS_PER_HOTSPOT = GLOBAL.PARAMS.QUADRAT_CHECKS_PER_HOTSPOT;
const ZOOM_ALERT_CURSOR = GLOBAL.CURSORS.ZOOM_ALERT_CURSOR;

const HOTSPOT_DIAMETER = 20;
module.exports.HOTSPOT_DIAMETER = HOTSPOT_DIAMETER;

Phaser.GameObjects.GameObjectFactory.register('hotspot', function (hotspotData) {
	let q = hotspotData;
	
	const ex = new module.exports.Hotspot(this.scene, q.x, q.y, q.flowerArr, q.coordArr, q.hotspots, q.isCompleted, q.id, q.results);
	
	this.displayList.add(ex);
	
	return ex;
});

Phaser.GameObjects.GameObjectFactory.register('resultspopup', function constructor(x, y, results) {
	const ex = new module.exports.ResultsPopup(this.scene, x, y, results);
	
	this.updateList.add(ex);
	[ex.bg, ex.yellowImg, ex.blueImg, ex.purpleImg, ex.yellowNum, ex.blueNum, ex.purpleNum].forEach(value => { 
		ex.add(value, true); 
	});
	
	return ex;
});

module.exports.HotspotStorage = 
class HotspotStorage {
	constructor(array) {
		this.get = array;
	}
};

module.exports.HotspotData = 
class HotspotData {
	static generateHotspot(hotspotsArr, id) {
		let w = Math.random() * (GAME_WIDTH - HOTSPOT_DIAMETER);
		let h = 300 + (Math.random() * (300 - HOTSPOT_DIAMETER));
		let flowerData = [];
		let coordData = [];
		
		let range = MAX_FPH-MIN_FPH;
		let numFlowers = Math.floor(Math.random() * (range + 1)) + MIN_FPH;
		
		
		for (let i = 0; i < numFlowers; i++) {
			flowerData.push(FlowerData.generateRandomFlower());
		}
		for (let i = 0; i < QUADRAT_CHECKS_PER_HOTSPOT; i++) {
			let coords = [-1, -1];
			coords[0] = Math.floor(Math.random() * (GRID_X_MAX-QUADRAT_SIZE+1));
			coords[1] = Math.floor(Math.random() * (GRID_Y_MAX-QUADRAT_SIZE+1));
			coordData.push(coords);
		}
		
		return new HotspotData(w, h, flowerData, coordData, hotspotsArr, false, id);
	}
	
	constructor(x, y, flowerArr, coordArr, hotspotsArr, isCompleted, id) {
		this.x = x;
		this.y = y;
		this.flowerArr = flowerArr;
		this.coordArr = coordArr;
		this.hotspots = hotspotsArr;
		this.isCompleted = isCompleted;
		this.id = id;
		this.results = null;
	}
};

module.exports.Hotspot = 
class Hotspot extends Phaser.GameObjects.Ellipse {
	
	constructor(scene, x, y, flowerArr, coordArr, hotspotStorage, isCompleted, id, results)
	{
		super(scene, x, y, HOTSPOT_DIAMETER, HOTSPOT_DIAMETER, 0xff003a);
		this.flowerData = flowerArr;
		this.coordData = coordArr;
		this.isCompleted = isCompleted;
		this.id = id;

		if (isCompleted) {
			this.setFillStyle(0x0021db);
			this.resultsPopup = scene.add.resultspopup(x, y, results);
			this.resultsPopup.close();
		
			let me = this;
			// On hover show stats
			this.setInteractive({ cursor : ZOOM_ALERT_CURSOR }).on('pointerover', function(pointer, localX, localY, event) {
				me.resultsPopup.open();
			});
			this.setInteractive({ cursor : ZOOM_ALERT_CURSOR }).on('pointerout', function(pointer, localX, localY, event) {
				me.resultsPopup.close();
			});
		} else {
			// On click start new scene
			this.setInteractive({ cursor : ZOOM_ALERT_CURSOR }).on('pointerdown', function(pointer, localX, localY, event) {
				scene.scene.start("hotspotScene", { hotspotClicked : id, hotspots : hotspotStorage });
			});
		}
	}
};

module.exports.ResultsPopup = 
class ResultsPopup extends Phaser.GameObjects.Group {
	constructor(scene, x, y, results) {
		super(scene);
		let font = {'fill': '0xffffff', 'font': '16px Courier New'};
		
		let bg = new Phaser.GameObjects.Rectangle(scene, x, y, 100, 200, 0xCCCCCC);
		bg.setOrigin(0,1);
		this.bg = bg;
		
		let yellowImg = new Phaser.GameObjects.Image(scene, x+10, y-140, 'yellow');
		yellowImg.setOrigin(0,1);
		yellowImg.setDisplaySize(50, 50);
		this.yellowImg = yellowImg;
		
		let blueImg = new Phaser.GameObjects.Image(scene, x+10, y-75, 'blue');
		blueImg.setOrigin(0,1);
		blueImg.setDisplaySize(50, 50);
		this.blueImg = blueImg;
		
		let purpleImg = new Phaser.GameObjects.Image(scene, x+10, y-10, 'purple');
		purpleImg.setOrigin(0,1);
		purpleImg.setDisplaySize(50, 50);
		this.purpleImg = purpleImg;

		let yellowNum = new CentredTextEX(scene, x+85, y-160, results['yellow'], font);
		yellowNum.setOrigin(0.5, 1);
		this.yellowNum = yellowNum;
		
		let blueNum = new CentredTextEX(scene, x+85, y-95, results['blue'], font);
		blueNum.setOrigin(0.5, 1);
		this.blueNum = blueNum;
		
		let purpleNum = new CentredTextEX(scene, x+85, y-30, results['purple'], font);
		purpleNum.setOrigin(0.5, 1);
		this.purpleNum = purpleNum;
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