require("./phaser.js");
require("./game_sections.js");
require("./UIToolExtensions.js");
const HotspotStorage = require("./hotspot.js").HotspotStorage;
const HotspotData = require("./hotspot.js").HotspotData;
const HOTSPOT_DIAMETER = require("./hotspot.js").HOTSPOT_DIAMETER;
const FlowerData = require("./flower.js").FlowerData;
const Counter = require("./counter.js").Counter;
const GLOBAL = require("./global_constants.js");
const STRINGS = GLOBAL.STRINGS;
const IMAGE_PATH = GLOBAL.ASSET_PATHS.IMAGE;
const GAME_WIDTH = GLOBAL.DISPLAY.GAME_WIDTH;
const GAME_HEIGHT = GLOBAL.DISPLAY.GAME_HEIGHT;
const GAME_PADDING = GLOBAL.DISPLAY.GAME_PADDING;
const NUM_HOTSPOTS = GLOBAL.PARAMS.NUM_HOTSPOTS;
const QUADRAT_CHECKS_PER_HOTSPOT = GLOBAL.PARAMS.QUADRAT_CHECKS_PER_HOTSPOT;
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
		// Alternate reference for the MyScene object
		let me = this;
		
		// Area containers (see game_sections.js)
		let ga  = this.add.gamearea();
		let uia = this.add.uiarea();
		
		// Function for changing the instructions popup
		this.setPopup = function (title, txt, width, height) {
			let popup = me.add.popup(10,10,width, height);
			ga.add(popup.getChildren());
			popup.setTitleText(title);
			popup.setDescriptionText(txt);
			me.currentPopup = popup;
		};
		
		// Functions for activating finale stages
		this.startFinale3 = function () {
			me.currentPopup.close();
			me.setPopup(STRINGS.FINALE_3_TITLE, 
				STRINGS.FINALE_3 + STRINGS.FINALE_3_HELPER_A + (NUM_HOTSPOTS * QUADRAT_CHECKS_PER_HOTSPOT) + ".",
				GAME_WIDTH-20, 
				325);
			
			// Add hotspot with total flowers
			let totalHotspot = new HotspotData((GAME_WIDTH-HOTSPOT_DIAMETER)-20, 300 + (HOTSPOT_DIAMETER/2), [], [], [], true, -1);
			totalHotspot.results = {};
			FlowerData.flowerTypes.forEach(type => {
				totalHotspot.results[type] = 0;
			});
			
			me.hotspots.get.forEach(value => {
				FlowerData.flowerTypes.forEach(type => {
					totalHotspot.results[type] += value.results[type];
				});
			});
			
			me.currentPopup.add(me.add.hotspot(totalHotspot));
			me.currentPopup.add(me.add.text((GAME_WIDTH-HOTSPOT_DIAMETER)-120, 300, "Total -->", { color: '0x000000' }));
				
			// Add Counters
			let yCount = me.add.counter(0, 25, 'yellow');
			let bCount = me.add.counter(0, 195, 'blue');
			let pCount = me.add.counter(0, 365, 'purple');
		
			[yCount.getChildren(), bCount.getChildren(), pCount.getChildren()].forEach(value => { uia.add(value); });
			
			let submitButton = me.add.textbuttonex(0, GAME_HEIGHT + GAME_PADDING - 30, 80, 30, 'Submit', function () {
				let toCheck = [yCount, bCount, pCount];
				let pass = true;
				toCheck.forEach(valueC => {
					let tally = 0;
					me.hotspots.get.forEach(valueH => {
						tally += valueH.results[valueC.type];
					});

					if (Math.round(tally/(NUM_HOTSPOTS * QUADRAT_CHECKS_PER_HOTSPOT)) != valueC.count)
						pass = false;
				});
					
				if (pass) {
					me.currentPopup.close();
					me.setPopup(STRINGS.CONGRATS_TITLE, 
						STRINGS.CONGRATS_TEXT,
						GAME_WIDTH-20, 
						100);
						
					let playAgainButton = me.add.textbuttonex((GAME_WIDTH-50)/2, 75, 100, 40, "Play Again", function () {
						FlowerData.shuffle();
						me.scene.start("mapScene", { hotspots : undefined});
					});
					playAgainButton.setBackgroundColour(0x00FF00);
					me.currentPopup.add(playAgainButton);
				}
			});
			submitButton.setBackgroundColour(0x00FF00)
			
			submitButton.bg.setInteractive().on('pointerdown', function() {
				submitButton.destroy(true, true);
			});
			
			uia.add(submitButton.getChildren());
		}
		
		this.startFinale2 = function () {
			// Change Popup
			me.currentPopup.close();
			me.setPopup(STRINGS.FINALE_2_TITLE, 
				STRINGS.FINALE_2 + STRINGS.FINALE_2_HELPER_A + NUM_HOTSPOTS + "." + STRINGS.FINALE_2_HELPER_B + QUADRAT_CHECKS_PER_HOTSPOT + ".",
				GAME_WIDTH-20, 
				350);
			let checkCounter = me.add.counter((GAME_WIDTH/2)-112, 150, '');
			me.currentPopup.add(checkCounter);
			
			let submitButton = me.add.textbuttonex((GAME_WIDTH/2)-30, 330, 80, 30, 'Submit', function() {
				if (checkCounter.count == (QUADRAT_CHECKS_PER_HOTSPOT * NUM_HOTSPOTS)) {
					me.startFinale3();
				}
			});
			submitButton.setBackgroundColour(0x00FF00)
			me.currentPopup.add(submitButton);
		}
		
		this.startFinale1 = function () {
			// Add Counters
			let yCount = me.add.counter(0, 25, 'yellow');
			let bCount = me.add.counter(0, 195, 'blue');
			let pCount = me.add.counter(0, 365, 'purple');
		
			[yCount.getChildren(), bCount.getChildren(), pCount.getChildren()].forEach(value => { uia.add(value); });
				
			// Change Popup
			me.currentPopup.close();
			me.setPopup(STRINGS.FINALE_1_TITLE, STRINGS.FINALE_1, GAME_WIDTH-20, 100);
			
			
			let submitButton = me.add.textbuttonex(0, GAME_HEIGHT + GAME_PADDING - 30, 80, 30, 'Submit', function () {
				let toCheck = [yCount, bCount, pCount];
				let pass = true;
				toCheck.forEach(valueC => {
					let tally = 0;
					me.hotspots.get.forEach(valueH => {
						tally += valueH.results[valueC.type];
					});
					
					if (tally != valueC.count)
						pass = false;
				});
					
				if (pass) {
					// Get rid of this button and start the next stage
					yCount.destroy(true, true);
					bCount.destroy(true, true);
					pCount.destroy(true, true);
					me.startFinale2();
				}
			});
			submitButton.bg.setInteractive().on('pointerdown', function() {
				submitButton.destroy(true, true);
			});
			submitButton.setBackgroundColour(0x00FF00)
			uia.add(submitButton.getChildren());
		}
		
		// Add background
		let bg = this.add.image(0,0,'bg');
		bg.setDisplaySize(GAME_WIDTH, GAME_HEIGHT);
		bg.setOrigin(0,0);
		ga.add(bg);
		
		// Set'How to Play' popup as current popup
		this.setPopup(STRINGS.HOW_TO_PLAY, STRINGS.HELP_DESCRIPTION_MAP_SCENE, GAME_WIDTH-20, 100);
		
		// Popup button - Displays this.currentPopup
		uia.add(this.add.textbuttonex(0,0,20,20, "?", function() {
			me.currentPopup.open();
		}).getChildren());

		// Add hotspots to scene
		if (data.hotspots != undefined) { // If hotspots already generated
			this.hotspots = data.hotspots;

			let allCompleted = true;
			for (let i = 0; i < NUM_HOTSPOTS; i++) {
				ga.add(this.add.hotspot(this.hotspots.get[i]));
				
				if (!this.hotspots.get[i].isCompleted)
					allCompleted = false;
			}
			if (allCompleted) {
				this.startFinale1();
			}
			
		} else { // Generate new hotspots otherwise
			this.hotspots = new HotspotStorage([]);
			for (let i = 0; i < NUM_HOTSPOTS; i++) {
				this.hotspots.get[i] = HotspotData.generateHotspot(this.hotspots, i);
				ga.add(this.add.hotspot(this.hotspots.get[i]));
			}
		}
		
	},
    update: function (time, delta) {}
});