var hotspotScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "hotspotScene" });
    },
    init: function(data) {
	},
    preload: function() {
		this.load.image('yellow', 'assets/yellow-flower-clipart.jpg');
		this.load.image('blue', 'assets/blue-flower-clipart.jpg');
		this.load.image('purple', 'assets/purple-flower-clipart.jpg');
		this.load.image('back', 'assets/backbutton.png');
		this.load.image('arrowup', 'assets/arrowup.jpg');
		this.load.image('arrowdown', 'assets/arrowdown.jpg');
	},
    create: function(data) {
       	this.add.rectangle(10, 10, 780, 580, 0x00FF00).setOrigin(0,0);
		console.log(data);
		let backBtn = this.add.image(800, 550, 'back');
		backBtn.setOrigin(0,0);
		backBtn.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
			this.scene.scene.start("mapScene", { hotspots : data.hotspots });
		});
	
		/*
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
		*/
		
		{
			let sceneRef = this;
			data.hotspotClicked.flowerData.forEach( function(value) {
				value.createGameObject(sceneRef);
			});
		}

		for (let i = 1; i < GRID_X_MAX; i++) {
			let l = this.add.line(i*50, 10, 0, 0, 0, 580, 0x000000, 0.2);
			l.setOrigin(0,0);
			l.lineWidth = 5;
		}
		for (let i = 1; i < GRID_Y_MAX; i++) {
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
		
		new Counter(this, 800, 0, 'yellow');
		new Counter(this, 800, 170, 'blue');
		new Counter(this, 800, 340, 'purple');
		new Randomizer(this, 850, 510, 0, GRID_X_MAX);
		new Randomizer(this, 900, 510, 0, GRID_Y_MAX);
		
    },
    update: function() {}
});