require("./phaser.js");
const FlowerData = require("./flower.js").FlowerData;
const GLOBAL = require("./global_constants");
const GAME_WIDTH = GLOBAL.DISPLAY.GAME_WIDTH;
const MAX_FPH = GLOBAL.PARAMS.MAX_FLOWERS_PER_HOTSPOT;
const MIN_FPH = GLOBAL.PARAMS.MIN_FLOWERS_PER_HOTSPOT;
const QUADRAT_SIZE = GLOBAL.PARAMS.QUADRAT_SIZE;
const GRID_X_MAX = GLOBAL.PARAMS.GRID_X_MAX;
const GRID_Y_MAX = GLOBAL.PARAMS.GRID_Y_MAX;
const QUADRAT_CHECKS_PER_HOTSPOT = GLOBAL.PARAMS.QUADRAT_CHECKS_PER_HOTSPOT;
const ZOOM_ALERT_CURSOR = GLOBAL.CURSORS.ZOOM_ALERT_CURSOR;

Phaser.GameObjects.GameObjectFactory.register('hotspot', function (hotspotData) {
	let q = hotspotData;
	
	const ex = new module.exports.Hotspot(this.scene, q.x, q.y, q.flowerArr, q.coordArr, q.hotspots, q.isCompleted, q.id);
	
	this.displayList.add(ex);
	
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
		let w = Math.random() * GAME_WIDTH;
		let h = 300 + (Math.random() * (300));
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
	}
};

module.exports.Hotspot = 
class Hotspot extends Phaser.GameObjects.Ellipse {
	
	constructor(scene, x, y, flowerArr, coordArr, hotspotStorage, isCompleted, id)
	{
		super(scene, x, y, 20, 20, 0xffd900);
		this.flowerData = flowerArr;
		this.coordData = coordArr;
		this.isCompleted = isCompleted;
		this.id = id;

		if (isCompleted) {
			this.setFillStyle(0x00ff00);
		

		} else {
			// On click do something
			this.setInteractive({ cursor : ZOOM_ALERT_CURSOR }).on('pointerdown', function(pointer, localX, localY, event) {
				scene.scene.start("hotspotScene", { hotspotClicked : id, hotspots : hotspotStorage });
			});
		}
	}
};