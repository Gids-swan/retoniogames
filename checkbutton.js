require("./phaser.js");
const FlowerData = require("./flower.js").FlowerData;

Phaser.GameObjects.GameObjectFactory.register('checkbtn', function (x, y, hotspotsArr, hotspot, counters, randomizer) {
	const ex = new module.exports.CheckButton(this.scene, x, y, hotspotsArr, hotspot, counters, randomizer);
	
	this.updateList.add(ex);
	[ex.bg, ex.txt].forEach(value => { ex.add(value, true); });
	
	return ex;
});

module.exports.CheckButton = 
class CheckButton extends Phaser.GameObjects.Group {
	constructor(scene, x, y, hotspotStorage, id, countersArray, randomizer) {
		super(scene);
		
		this.flowers = hotspotStorage.get[id].flowerArr;
		this.counters = countersArray;
		this.randomizer = randomizer;
		
		let me = this;
		let bg = new Phaser.GameObjects.Rectangle(scene, x, y, 70, 50, 0x00FF00);
		bg.setOrigin(0,0);
		bg.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
			if (me.check()) {
				hotspotStorage.get[id].isCompleted = true;
				me.scene.scene.start("mapScene", { hotspots : hotspotStorage });
			} else {
				console.log("Oh no!");
				console.log(me.results);
			}
		});
		this.bg = bg;
		
		let txt = new Phaser.GameObjects.Text(scene, x+35, y+25, "Check", {'fill': '#000', 'font': '16px Courier New'});
		txt.setAlign('center');
		txt.setOrigin(0.5, 0.5);
		this.txt = txt;
		
		this.tally();
	}
	
	tally() {
		// Tally setup
		this.results = {};
		FlowerData.flowerTypes.forEach(type => {
			this.results[type] = 0;
		});
		
		this.flowers.forEach(f => {
			this.randomizer.coords.forEach( coord => {
				if (f.coordCheck(coord)) {
					this.results[f.type]++;
				}
			});
		});
	}
	
	check() {
		let pass = true;
		
		this.counters.forEach(counter => {
			if (this.results[counter.type] != counter.count) {
				pass = false;
			}
		});
		
		return pass;
	}
}