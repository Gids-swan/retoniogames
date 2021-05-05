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
		this.load.image('arrowleft', IMAGE_ASSET_PATH + '/thinarrowleft.png');
		this.load.image('arrowright', IMAGE_ASSET_PATH + '/thinarrowright.png');
		
		this.load.audio('click', SOUND_ASSET_PATH + '/mouse-click.wav');
	},
    create: function(data) {
		// Create containers
		let ga = this.add.gamearea();
		let uia = this.add.uiarea();
	
		// Background for Game Area
       	ga.add(this.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x00FF00).setOrigin(0,0));
		
		// Grid lines for game area
		for (let i = 1; i < GRID_X_MAX; i++) {
			ga.add(this.add.gridlineex(i*50, 0, 0, 0, 0, GAME_HEIGHT));
		}
		for (let i = 1; i < GRID_Y_MAX; i++) {
			ga.add(this.add.gridlineex(0, i*50, 0, 0, GAME_WIDTH, 0));
		}
		
		// Back button for UI area
		let backBtn = this.add.image(0, 585, 'back');
		backBtn.setOrigin(0,0);
		backBtn.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
			this.scene.scene.start("mapScene", { hotspots : data.hotspots});
		});
		uia.add(backBtn);
				
		{
			let sceneRef = this;
			data.hotspots.get[data.hotspotClicked].flowerArr.forEach( function(value) {
				ga.add(sceneRef.add.flower(value.x, value.y, value.type));
			});
		}
		
		ga.add((this.add.quadrat(200, 200)).getChildren());
		
		let yCount = this.add.counter(0, 25, 'yellow');
		let bCount = this.add.counter(0, 195, 'blue');
		let pCount = this.add.counter(0, 365, 'purple');
		let randomizer = this.add.randomizer(0, 535, data.hotspots.get[data.hotspotClicked].coordArr);
		let check = this.add.checkbtn(UI_WIDTH-70, 570, data.hotspots, data.hotspotClicked, [yCount, bCount, pCount], randomizer);
		
		[yCount.getChildren(), bCount.getChildren(), pCount.getChildren(), randomizer.getChildren(), check.getChildren()].forEach(value => { uia.add(value); });
		
		
		// 'How to Play' popup
		let popup = this.add.popup(10,10,GAME_WIDTH-20,100);
		ga.add(popup.getChildren());
		popup.setTitleText("How To Play");
		popup.setDescriptionText(HELP_DESCRIPTION_HOTSPOT_SCENE);
		
		// Popup button
		uia.add(this.add.buttonex(0,GAME_PADDING,20,20, 'btn', function() {
			popup.getChildren().forEach(value => {
				value.setActive(true).setVisible(true);
			});
		}));
    },
    update: function() {}
});