Phaser.GameObjects.GameObjectFactory.register('hotspot', function (hotspotData) {
	let q = hotspotData;
	
	const ex = new Hotspot(this.scene, q.x, q.y, q.flowerArr, q.coordArr, q.hotspots, q.isCompleted, q.id);
	
	this.displayList.add(ex);
	
	return ex;
});

class HotspotStorage {
	constructor(array) {
		this.get = array;
	}
}

class HotspotData {
	static generateHotspot(hotspotsArr, id) {
		let w = Math.random() * GAME_WIDTH;
		let h = 300 + (Math.random() * (300));
		let flowerData = [];
		let coordData = [];
		
		let range = MAX_FLOWERS_PER_HOTSPOT-MIN_FLOWERS_PER_HOTSPOT;
		let numFlowers = Math.floor(Math.random() * (range+1))+MIN_FLOWERS_PER_HOTSPOT;
		
		
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
}

class Hotspot extends Phaser.GameObjects.Ellipse {
	
	constructor(scene, x, y, flowerArr, coordArr, hotspotStorage, isCompleted, id)
	{
		super(scene, x, y, 20, 20, 0xffd900);
		this.flowerData = flowerArr;
		this.coordData = coordArr;
		this.isCompleted = isCompleted;
		this.id = id;

		if (isCompleted) {
			console.log("Completed");
			this.setFillStyle(0x00ff00);
		}
		
		// On click do something
		this.setInteractive({ cursor : ZOOM_ALERT_CURSOR }).on('pointerdown', function(pointer, localX, localY, event) {
			scene.scene.start("hotspotScene", { hotspotClicked : id, hotspots : hotspotStorage });
		});
	}
}