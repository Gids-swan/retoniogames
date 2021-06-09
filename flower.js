require("./phaser.js");
const GAME_PADDING = require("./global_constants.js").DISPLAY.GAME_PADDING;
const QUADRAT_SIZE = require("./global_constants.js").PARAMS.QUADRAT_SIZE;
const DISTANCE_UNIT = require("./global_constants.js").PARAMS.DISTANCE_UNIT;

Phaser.GameObjects.GameObjectFactory.register('flower', function (x, y, type) {
	const ex = new module.exports.Flower(this.scene, x, y, type);
	
	this.displayList.add(ex);
	
	return ex;
});

module.exports.FlowerData = 
class FlowerData {
	static flowerTypes = ['yellow', 'blue', 'purple'];
	static generateRandomFlower() {
		let type = FlowerData.flowerTypes[Math.floor(Math.random()*FlowerData.flowerTypes.length)];
		let x = (Math.random() * 755);
		let y = (Math.random() * 555);
		return new FlowerData(x, y, type);
	}
	
	
	constructor(x, y, type) {
		this.x = x
		this.y = y
		
		switch(type) {
			case 'yellow':
			case 'blue':
			case 'purple':
				this.type = type
				break;
			
			default:
				this.type = 'yellow';
				break;
		}
	}
	
	coordCheck(coords) {
		let flowerLeft = (this.x) / DISTANCE_UNIT;
		let flowerRight = (this.x + 25) / DISTANCE_UNIT;
		let flowerTop = (this.y) / DISTANCE_UNIT;
		let flowerBottom = (this.y + 25) / DISTANCE_UNIT;
		
		if (flowerRight >= coords[0] && flowerLeft <= coords[0]+QUADRAT_SIZE) {
			if (flowerBottom >= coords[1] && flowerTop <= coords[1]+QUADRAT_SIZE) {
				return true;
			}
		}
		
		return false;
	}
};

module.exports.Flower = 
class Flower extends Phaser.GameObjects.Image {
	
	constructor(scene, x, y, type)
	{
		super(scene, GAME_PADDING + x, y, 'yellow');
		
		switch(type) {
			case 'yellow':
			case 'blue':
			case 'purple':
				this.setTexture(type);
				break;
			
			default:
				this.setTexture('yellow');
				break;
		}
		
		this.displayWidth = 25;
		this.displayHeight = 25;
		this.setOrigin(0,0);
	}
};