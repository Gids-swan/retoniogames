class Flower extends Phaser.GameObjects.Image {
	static flowerTypes = ['yellow', 'blue', 'purple'];
	static generateRandomFlower(scene) {
		let type = flowerTypes[Math.floor(Math.random()*flowerTypes.length)];
		let x = 10 + (Math.random() * 755);
		let y = 10 + (Math.random() * 555);
		return new Flower(scene, x, y, type);
	}
	
	constructor(scene, x, y, type)
	{
		super(scene, x, y, 'yellow');
		
		switch(type) {
			case 'yellow':
				this.setTexture('yellow');
				break;
				
			case 'blue':
				this.setTexture('blue');
				break;
			
			case 'purple':
				this.setTexture('purple');
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