var textStyle = {'fill': '#FFF', 'font': '16px Courier New'};

var mapScene = new Phaser.Class({

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
		this.load.image('bg', IMAGE_ASSET_PATH + '/mikecattelfield.jpg');
		this.load.image('btn', IMAGE_ASSET_PATH + '/blue-button-240.jpg');
		this.load.image('closeBtn', IMAGE_ASSET_PATH + '/closeButton.png');
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
		if (data.hotspots != undefined) {
			this.hotspots = data.hotspots;
			for (let i = 0; i < NUM_HOTSPOTS; i++) {
				ga.add(this.add.hotspot(this.hotspots.get[i]));
			}
		} else {
			this.hotspots = new HotspotStorage([]);
			for (let i = 0; i < NUM_HOTSPOTS; i++) {
				this.hotspots.get[i] = HotspotData.generateHotspot(this.hotspots, i);
				ga.add(this.add.hotspot(this.hotspots.get[i]));
			}
		}
		console.log(this.hotspots);
		
		// 'How to Play' popup
		let popup = this.add.popup(10,10,GAME_WIDTH-20,100);
		ga.add(popup.getChildren());
		popup.setTitleText("How To Play");
		popup.setDescriptionText(HELP_DESCRIPTION_MAP_SCENE);
		
		// Popup button
		uia.add(this.add.buttonex(0,GAME_PADDING,20,20, 'btn', function() {
			popup.getChildren().forEach(value => {
				value.setActive(true).setVisible(true);
			});
		}));
		
	},
    update: function (time, delta) {}
});