Phaser.GameObjects.GameObjectFactory.register('hotspot', function (x, y, flowerArr, hotspotArr) {
	const ex = new Hotspot(this.scene, x, y, flowerArr, hotspotArr, this.scene);
	
	this.displayList.add(ex);
	
	return ex;
});

class HotspotData {
	static generateHotspot(hotspotArr) {
		let w = 10 + (Math.random() * 790);
		let h = 300 + (Math.random() * 290);
		let flowerData = [];
		for (let i = 0; i < 15; i++) {
			flowerData.push(FlowerData.generateRandomFlower());
		}
		
		return new HotspotData(w, h, flowerData, hotspotArr);
	}
	
	constructor(x, y, flowerArr, hotspotArr) {
		this.x = x;
		this.y = y;
		this.flowerArr = flowerArr;
		this.hotspotArr = hotspotArr;
	}
	
	createGameObject(scene) {
		return new Hotspot(scene, this.x, this.y, this.flowerArr, this.hotspotArr);
	}
}

class Hotspot extends Phaser.GameObjects.Ellipse {
	
	constructor(scene, x, y, flowerArr, hotspotArr)
	{
		super(scene, x, y, 20, 20, 0xffd900);
		this.flowerData = flowerArr;
		
		// On click do something
		this.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
			this.changeColour();
			scene.scene.start("hotspotScene", { hotspotClicked : this, hotspots : hotspotArr });
		});
		
		scene.add.existing(this);
	}
	
	changeColour() {
		this.fillColor = 0xff0000
	}
}