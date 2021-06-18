require("./phaser.js");
const GAME_WIDTH = require("./global_constants.js").DISPLAY.GAME_WIDTH;
const GAME_HEIGHT = require("./global_constants.js").DISPLAY.GAME_HEIGHT;
const QUADRAT_SIZE = require("./global_constants.js").PARAMS.QUADRAT_SIZE;
const DISTANCE_UNIT = require("./global_constants.js").PARAMS.DISTANCE_UNIT;

const DISPLAY_WIDTH = 25;
const DISPLAY_HEIGHT = 25;

Phaser.GameObjects.GameObjectFactory.register('flower', function (x, y, type) {
	const ex = new module.exports.Flower(this.scene, x, y, type);
	
	this.displayList.add(ex);
	
	return ex;
});

module.exports.FlowerData = 
class FlowerData {
	static flowerTypes = ['yellow', 'blue', 'purple'];
	static flowerProbs = [Math.random(), Math.random(), Math.random()];
	static totalProbs = FlowerData.flowerProbs[0] + FlowerData.flowerProbs[1] + FlowerData.flowerProbs[2];
	static generateRandomFlower() {
		let seed = Math.random() * FlowerData.totalProbs;
		let sum = FlowerData.flowerProbs[0];
		let index = 0;

		while (sum < seed) {
			index++;
			sum += FlowerData.flowerProbs[index];
		}
		
		let type = FlowerData.flowerTypes[index];
		let x = (Math.random() * (GAME_WIDTH - DISPLAY_WIDTH));
		let y = (Math.random() * (GAME_HEIGHT - DISPLAY_HEIGHT));
		return new FlowerData(x, y, type);
	}
	
	static shuffle() {
		FlowerData.flowerProbs = [Math.random(), Math.random(), Math.random()];
		FlowerData.totalProbs = FlowerData.flowerProbs[0] + FlowerData.flowerProbs[1] + FlowerData.flowerProbs[2];
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
		let flowerRight = (this.x + DISPLAY_WIDTH) / DISTANCE_UNIT;
		let flowerTop = (this.y) / DISTANCE_UNIT;
		let flowerBottom = (this.y + DISPLAY_HEIGHT) / DISTANCE_UNIT;
		
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
		super(scene, x, y, 'yellow');
		
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
		
		this.displayWidth = DISPLAY_WIDTH;
		this.displayHeight = DISPLAY_HEIGHT;
		this.setOrigin(0,0);
	}
};