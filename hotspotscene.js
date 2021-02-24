var hotspotScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "hotspotScene" });
    },
    init: function() {},
    preload: function() {
		this.load.image('flower', 'assets/yellow-flower-clipart.jpg');
	},
    create: function() {
       	this.add.rectangle(10, 10, 780, 580, 0x00FF00).setOrigin(0,0);
	
		let flowers = [];
		//const length = 7;

		for (i = 0; i < 4; i++) {
			let w = 10 + (Math.random() * 755);
			let h = 10 + (Math.random() * 555);
			flowers[i] = new Flower(this, w, h, 'yellow');
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
    },
    update: function() {}
});