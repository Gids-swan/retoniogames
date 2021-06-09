require("./phaser.js");
require("./game_sections.js");
require("./UIToolExtensions.js");
const HotspotStorage = require("./hotspot.js").HotspotStorage;
const HotspotData = require("./hotspot.js").HotspotData;
const GLOBAL = require("./global_constants.js");
const IMAGE_PATH = GLOBAL.ASSET_PATHS.IMAGE;
const GAME_WIDTH = GLOBAL.DISPLAY.GAME_WIDTH;
const GAME_HEIGHT = GLOBAL.DISPLAY.GAME_HEIGHT;
const GAME_PADDING = GLOBAL.DISPLAY.GAME_PADDING;
const HELP = GLOBAL.STRINGS.HELP_DESCRIPTION_MAP_SCENE;
const NUM_HOTSPOTS = GLOBAL.PARAMS.NUM_HOTSPOTS;
const ZOOM_CURSOR = GLOBAL.CURSORS.ZOOM_CURSOR;

const textStyle = {'fill': '#FFF', 'font': '16px Courier New'};

module.exports.mapScene = 
new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function MyScene (config)
    {	
        Phaser.Scene.call(this, { "key" : "mapScene" , hotspots : undefined});
    },

    init: function () {
		this.input.setDefaultCursor(ZOOM_CURSOR);
	},
    preload: function () {
		this.load.image('bg', IMAGE_PATH + '/mikecattelfield.jpg');
		this.load.image('btn', IMAGE_PATH + '/helpbutton.png');
		this.load.image('closeBtn', IMAGE_PATH + '/closeButton.png');
	},
    create: function (data) {
		// Area containers (see game_sections.js)
		let ga  = this.add.gamearea();
		let uia = this.add.uiarea();
		
		// Add background
		let bg = this.add.image(0,0,'bg');
		bg.setDisplaySize(GAME_WIDTH, GAME_HEIGHT);
		bg.setOrigin(0,0);
		ga.add(bg);

		// Add hotspots to scene
		if (data.hotspots != undefined) { // If hotspots already generated
			this.hotspots = data.hotspots;

			let allCompleted = true;
			for (let i = 0; i < NUM_HOTSPOTS; i++) {
				ga.add(this.add.hotspot(this.hotspots.get[i]));
				
				if (!this.hotspots.get[i].isCompleted)
					allCompleted = false;
			}
			if (allCompleted)
				console.log("All Completed! Well Done!");
		} else { // Generate new hotspots otherwise
			this.hotspots = new HotspotStorage([]);
			for (let i = 0; i < NUM_HOTSPOTS; i++) {
				this.hotspots.get[i] = HotspotData.generateHotspot(this.hotspots, i);
				ga.add(this.add.hotspot(this.hotspots.get[i]));
			}
		}
		
		// 'How to Play' popup
		let popup = this.add.popup(10,10,GAME_WIDTH-20,100);
		ga.add(popup.getChildren());
		popup.setTitleText("How To Play");
		popup.setDescriptionText(HELP);

		let me = this;
		// Popup button
		uia.add(this.add.buttonex(0,GAME_PADDING,20,20, 'btn', function() {
			popup.getChildren().forEach(value => {
				value.setActive(true).setVisible(true);
			});
		}));
		
	},
    update: function (time, delta) {}
});