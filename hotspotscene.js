require("./phaser.js");
require("./UIToolExtensions.js");
require("./flower.js");
require("./quadrat.js");
require("./counter.js");
require("./randomizer.js");
require("./checkbutton.js");
const GLOBAL = require("./global_constants.js");
const PATHS = GLOBAL.ASSET_PATHS;
const GAME_WIDTH = GLOBAL.DISPLAY.GAME_WIDTH;
const GAME_HEIGHT = GLOBAL.DISPLAY.GAME_HEIGHT;
const GAME_PADDING = GLOBAL.DISPLAY.GAME_PADDING;
const UI_WIDTH = GLOBAL.DISPLAY.UI_WIDTH;
const HELP = GLOBAL.STRINGS.HELP_DESCRIPTION_HOTSPOT_SCENE;
const GRID_X_MAX = GLOBAL.PARAMS.GRID_X_MAX;
const GRID_Y_MAX = GLOBAL.PARAMS.GRID_Y_MAX;
const DISTANCE_UNIT = GLOBAL.PARAMS.DISTANCE_UNIT;

module.exports.hotspotScene =
	new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "hotspotScene" });
    },
    init: function(data) {
	},
    preload: function() {
		this.load.image('yellow', PATHS.IMAGE + '/yellow-flower-clipart.jpg');
		this.load.image('blue', PATHS.IMAGE + '/blue-flower-clipart.jpg');
		this.load.image('purple', PATHS.IMAGE + '/purple-flower-clipart.jpg');
		this.load.image('back', PATHS.IMAGE + '/backbutton.png');
		this.load.image('arrowup', PATHS.IMAGE + '/arrowup.jpg');
		this.load.image('arrowdown', PATHS.IMAGE + '/arrowdown.jpg');
		this.load.image('arrowleft', PATHS.IMAGE + '/thinarrowleft.png');
		this.load.image('arrowright', PATHS.IMAGE + '/thinarrowright.png');
		
		this.load.audio('click', PATHS.SOUND + '/mouse-click.wav');
	},
    create: function(data) {
		// Create containers
		let ga = this.add.gamearea();
		let uia = this.add.uiarea();
	
		// Background for Game Area
       	ga.add(this.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x00FF00).setOrigin(0,0));
		
		// Grid lines for game area
		for (let i = 1; i < GRID_X_MAX; i++) {
			ga.add(this.add.gridlineex(i * DISTANCE_UNIT, 0, 0, 0, 0, GAME_HEIGHT));
		}
		for (let i = 1; i < GRID_Y_MAX; i++) {
			ga.add(this.add.gridlineex(0, i * DISTANCE_UNIT, 0, 0, GAME_WIDTH, 0));
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
		popup.setDescriptionText(HELP);
		
		// Popup button
		uia.add(this.add.buttonex(0,GAME_PADDING,20,20, 'btn', function() {
			popup.getChildren().forEach(value => {
				value.setActive(true).setVisible(true);
			});
		}));
    },
    update: function() {}
});