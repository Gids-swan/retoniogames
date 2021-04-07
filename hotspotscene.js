var hotspotScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "hotspotScene" });
    },
    init: function(data) {
	},
    preload: function() {
		this.load.image('yellow', IMAGE_ASSET_PATH + '/yellow-flower-clipart.jpg');
		this.load.image('blue', IMAGE_ASSET_PATH + '/blue-flower-clipart.jpg');
		this.load.image('purple', IMAGE_ASSET_PATH + '/purple-flower-clipart.jpg');
		this.load.image('back', IMAGE_ASSET_PATH + '/backbutton.png');
		this.load.image('arrowup', IMAGE_ASSET_PATH + '/arrowup.jpg');
		this.load.image('arrowdown', IMAGE_ASSET_PATH + '/arrowdown.jpg');
		this.load.image('arrowdown', IMAGE_ASSET_PATH + '/arrowdown.jpg');
		this.load.image('arrowleft', IMAGE_ASSET_PATH + '/thinarrowleft.png');
		this.load.image('arrowright', IMAGE_ASSET_PATH + '/thinarrowright.png');
		
		this.load.audio('click', SOUND_ASSET_PATH + '/mouse-click.wav');
	},
    create: function(data) {
       	this.add.rectangle(GAME_PADDING, GAME_PADDING, GAME_WIDTH, GAME_HEIGHT, 0x00FF00).setOrigin(0,0);
		let backBtn = this.add.image(800, 550, 'back');
		backBtn.setOrigin(0,0);
		backBtn.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
			this.scene.scene.start("mapScene", { hotspots : data.hotspots });
		});
		
		{
			let sceneRef = this;
			data.hotspotClicked.flowerData.forEach( function(value) {
				sceneRef.add.flower(value.x, value.y, value.type);
			});
		}

		for (let i = 1; i < GRID_X_MAX; i++) {
			let l = this.add.line(GAME_PADDING + (i*50), GAME_PADDING, 0, 0, 0, GAME_HEIGHT, 0x000000, 0.2);
			l.setOrigin(0,0);
			l.lineWidth = 5;
		}
		for (let i = 1; i < GRID_Y_MAX; i++) {
			let l = this.add.line(GAME_PADDING, GAME_PADDING + (i*50), 0, 0, GAME_WIDTH, 0, 0x000000, 0.2);
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
		
		let yCount = new Counter(this, PADDED_GAME_WIDTH, 0, 'yellow');
		let bCount = new Counter(this, PADDED_GAME_WIDTH, 170, 'blue');
		let pCount = new Counter(this, PADDED_GAME_WIDTH, 340, 'purple');
		let randomizer = new Randomizer(this, 850, 510);
		let check = new CheckButton(this, 900, 550);
		
		check.flowers = data.hotspotClicked.flowerData;
		check.counters = [yCount, bCount, pCount];
		check.randomizer = randomizer;
		
    },
    update: function() {}
});