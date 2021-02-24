var textStyle = {'fill': '#FFF', 'font': '16px Courier New'};

var mapScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function MyScene (config)
    {
        Phaser.Scene.call(this, { "key" : "mapScene" });
    },

    init: function (data) {},
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
		let hotspots = [];
		//const length = 7;

	
		//graphics = this.add.graphics(0, 0);
		//graphics.lineStyle(2, 0xffd900, 1);

		let i = 0;
		for (i = 0; i < 7; i++) {
			let w = 10 + (Math.random() * 790);
			let h = 300 + (Math.random() * 290);
			hotspots[i] = new Hotspot(this, w, h);
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