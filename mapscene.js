var textStyle = {'fill': '#FFF', 'font': '16px Courier New'};

var mapScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function MyScene (config)
    {	
        Phaser.Scene.call(this, { "key" : "mapScene" , hotspots : []});
    },

    init: function () {
	},
    preload: function () {
		this.load.image('bg', 'assets/mikecattelfield.jpg');
		this.load.image('zoom', 'assets/zoom.svg');
		this.load.image('zoom2', 'assets/zoomspotted.svg');
		this.load.image('btn', 'assets/blue-button-240.jpg');
	},
    create: function (data) {
		bg = this.add.image(0,0,'bg');
		bg.displayWidth = 800;
		bg.displayHeight = 600;
		bg.setOrigin(0,0);
	
	
		let txt = new uiWidgets.TextSprite(this, 100, 100, 'btn');
		txt.setText("Click a Hotspot!", textStyle);

		// Add hotspots to scene
		this.hotspots = [];
		
		if (data.hotspots != undefined) {
			this.hotspots = data.hotspots;
			console.log("data found");
			for (let i = 0; i < NUM_HOTSPOTS; i++) {
				this.hotspots[i].createGameObject(this);
			}
		} else {
			for (let i = 0; i < NUM_HOTSPOTS; i++) {
				this.hotspots[i] = HotspotData.generateHotspot(this.hotspots);
				this.hotspots[i].createGameObject(this);
			}
		}
			

	
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
	
	},
    update: function (time, delta) {}
});