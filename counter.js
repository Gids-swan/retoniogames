class CounterButtonUp extends uiWidgets.TextButton {
	constructor(scene, x, y, counter) {
		super(scene, x+50, y+35, 'arrowup', function() {counter.increment();}, scene, 0, 0, 0, 0);
		this.scene.add.existing(this);
	}
}

class CounterButtonDown extends uiWidgets.TextButton {
	constructor(scene, x, y, counter) {
		super(scene, x+50, y+35, 'arrowdown', function() {counter.decrement();}, scene, 0, 0, 0, 0);
		this.scene.add.existing(this);
	}
}

class Counter extends Phaser.GameObjects.Rectangle {
	
	constructor(scene, x, y, type) {
		super(scene, x, y, 225, 170, 0x785419);
		this.setOrigin(0,0);
		this.scene.add.existing(this);
		this.count = 0
		
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
		
		this.imageDisplay = this.scene.add.image(x+10, y+10, this.type).setOrigin(0, 0);
		this.imageDisplay.displayWidth = 100;
		this.imageDisplay.displayHeight = 100;
		
		this.scene.add.rectangle(x+10, y+110, 100, 50, 0x000000).setOrigin(0,0);
		this.countText = this.scene.add.text(x+60, y+135, this.count, {'fill': '#FFF', 'font': '16px Courier New'});
		this.countText.setAlign('center');
		this.countText.setOrigin(0.5, 0.5);
		
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