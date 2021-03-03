var hotspotScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "hotspotScene" });
    },
    init: function(data) {
		//console.log( data.hotspotClicked.x );
	},
    preload: function() {
		this.load.image('yellow', 'assets/yellow-flower-clipart.jpg');
		this.load.image('blue', 'assets/blue-flower-clipart.jpg');
		this.load.image('purple', 'assets/purple-flower-clipart.jpg');
		this.load.image('back', 'assets/blue-button-240.jpg');
		this.load.image('arrowup', 'assets/arrowup.jpg');
		this.load.image('arrowdown', 'assets/arrowdown.jpg');
	},
    create: function() {
       	this.add.rectangle(10, 10, 780, 580, 0x00FF00).setOrigin(0,0);
		
		let backBtn = this.add.image(0, 0, 'back');
		backBtn.setOrigin(0,0);
		backBtn.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
			this.scene.scene.start("mapScene");
		});
	
		let flowers = [];

		for (let i = 0; i < 4; i++) {
			let w = 10 + (Math.random() * 755);
			let h = 10 + (Math.random() * 555);
			flowers[i] = new Flower(this, w, h, 'yellow');
		}
		
		for (let i = 0; i < 4; i++) {
			let w = 10 + (Math.random() * 755);
			let h = 10 + (Math.random() * 555);
			flowers[i] = new Flower(this, w, h, 'blue');
		}
		
		for (let i = 0; i < 4; i++) {
			let w = 10 + (Math.random() * 755);
			let h = 10 + (Math.random() * 555);
			flowers[i] = new Flower(this, w, h, 'purple');
		}

		for (let i = 1; i < 16; i++) {
			let l = this.add.line(i*50, 10, 0, 0, 0, 580, 0x000000, 0.2);
			l.setOrigin(0,0);
			l.lineWidth = 5;
		}
		for (let i = 1; i < 12; i++) {
			let l = this.add.line(10, i*50, 0, 0, 780, 0, 0x000000, 0.2);
			l.setOrigin(0,0);
			l.lineWidth = 5;
		}
	
		new Quadrat(this, 275, 175);
	
	//this.input.setDefaultCursor('assets/zoom.svg, pointer');
	// .cur files
	
		// Temp. cursor
		zoom = this.add.image(0,0,'zoom');
		zoom.setScale(0.1);
		this.input.topOnly = true;
		this.input.on('gameobjectmove', function (pointer, gameObject) {
			zoom.x = pointer.x;
			zoom.y = pointer.y;
		});
		
		let button = new Counter(this, 0, 0, 'flower');
    },
    update: function() {}
});