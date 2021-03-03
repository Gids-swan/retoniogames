class FlowerData {
	static flowerTypes = ['yellow', 'blue', 'purple'];
	static generateRandomFlower() {
		let type = FlowerData.flowerTypes[Math.floor(Math.random()*FlowerData.flowerTypes.length)];
		let x = 10 + (Math.random() * 755);
		let y = 10 + (Math.random() * 555);
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
}

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
		
		this.displayWidth = 25;
		this.displayHeight = 25;
		this.setOrigin(0,0);
		this.scene.add.existing(this);
	}
	
	
}