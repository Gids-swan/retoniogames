require("./phaser.js");
const ButtonEX = require("./UIToolExtensions.js").ButtonEX;
const COUNTER_MAX = require("./global_constants.js").PARAMS.MAX_FLOWERS_PER_HOTSPOT * require("./global_constants.js").PARAMS.NUM_HOTSPOTS;

Phaser.GameObjects.GameObjectFactory.register('counter', function (x, y, type) {
	const ex = new module.exports.Counter(this.scene, x, y, type);
	
	this.updateList.add(ex);
	if (ex.type != null)
		[ex.bg, ex.img, ex.textBg, ex.counterup, ex.counterdown, ex.countText].forEach(value => { ex.add(value, true); });
	else
		[ex.bg, ex.textBg, ex.counterup, ex.counterdown, ex.countText].forEach(value => { ex.add(value, true); });
	
	return ex;
});

module.exports.Counter = 
class Counter extends Phaser.GameObjects.Group {
	
	constructor(scene, x, y, type)
	{
		super(scene);
		
		this.count = 0;
		
		switch(type) {
			case 'yellow':
			case 'blue':
			case 'purple':
				this.type = type;
				break;
			
			default:
				this.type = null;
				break;
		}
		
		let bg = new Phaser.GameObjects.Rectangle(scene, x, y, 225, 170, 0x785419);
		bg.setOrigin(0,0);
		this.bg = bg;
		
		if (this.type != null) {
			let img = new Phaser.GameObjects.Image(scene, x+10, y+10, this.type);
			img.setOrigin(0,0);
			img.setDisplaySize(100, 100);
			this.img = img;
			
			let textBg = new Phaser.GameObjects.Rectangle(scene, x+10, y+110, 100, 50, 0x000000)
			textBg.setOrigin(0,0);
			this.textBg = textBg;
		
			let countText = new Phaser.GameObjects.Text(scene, x+60, y+135, this.count, {'fill': '#FFF', 'font': '16px Courier New'});
			countText.setAlign('center');
			countText.setOrigin(0.5, 0.5);
			this.countText = countText;
		} else {
			
			// No image used, different position.
			let textBg = new Phaser.GameObjects.Rectangle(scene, x+10, y+60, 100, 50, 0x000000)
			textBg.setOrigin(0,0);
			this.textBg = textBg;
		
			let countText = new Phaser.GameObjects.Text(scene, x+60, y+85, this.count, {'fill': '#FFF', 'font': '16px Courier New'});
			countText.setAlign('center');
			countText.setOrigin(0.5, 0.5);
			this.countText = countText;
		}
		
		let me = this;
		this.counterup = new ButtonEX(scene, x + 120, y + 10, 100, 70, 'arrowup', function () { me.increment(); scene.sound.play('click');});
		this.counterdown = new ButtonEX(scene, x + 120, y + 90, 100, 70, 'arrowdown', function () { me.decrement(); scene.sound.play('click');});
	}
	
	increment() {
		if (this.count < COUNTER_MAX) {
			this.count += 1;
			this.countText.setText(this.count);
		}
	}
	
	decrement() {
		if (this.count > 0) {
			this.count -= 1;
			this.countText.setText(this.count);
		}
	}
	
	setCount(num) {
		if (num < 0)
			this.count = 0;
		else
			this.count = num;
		
		this.countText.setText(this.count);
	}
	
};