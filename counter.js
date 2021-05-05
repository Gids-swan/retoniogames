Phaser.GameObjects.GameObjectFactory.register('counter', function (x, y, type) {
	const ex = new Counter(this.scene, x, y, type);
	
	this.updateList.add(ex);
	[ex.bg, ex.img, ex.textBg, ex.counterup, ex.counterdown, ex.countText].forEach(value => { ex.add(value, true); });
	
	return ex;
});

class Counter extends Phaser.GameObjects.Group {
	
	constructor(scene, x, y, type)
	{
		super(scene);
		
		this.count = 0;
		
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
		
		let bg = new Phaser.GameObjects.Rectangle(scene, x, y, 225, 170, 0x785419);
		bg.setOrigin(0,0);
		this.bg = bg;
		
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
		
		this.counterup = new CounterButtonUp(scene, x+115, y+10, this);
		this.counterdown = new CounterButtonDown(scene, x+115, y+90, this);
	}
	
	increment() {
		if (this.count < 20) {
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
	
}


class CounterButtonUp extends uiWidgets.TextButton {
	constructor(scene, x, y, counter) {
		super(scene, x+50, y+35, 'arrowup', function() {counter.increment(); scene.sound.play('click');}, scene, 0, 0, 0, 0);
	}
}

class CounterButtonDown extends uiWidgets.TextButton {
	constructor(scene, x, y, counter) {
		super(scene, x+50, y+35, 'arrowdown', function() {counter.decrement(); scene.sound.play('click');}, scene, 0, 0, 0, 0);
	}
}