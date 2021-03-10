class CheckButton extends Phaser.GameObjects.Rectangle {
	constructor(scene, x, y) {
		super(scene, x, y, 70, 50, 0x00FF00);
		this.setOrigin(0,0);
		this.scene.add.existing(this);
		
		this.countText = this.scene.add.text(x+35, y+25, "Check", {'fill': '#000', 'font': '16px Courier New'});
		this.countText.setAlign('center');
		this.countText.setOrigin(0.5, 0.5);
		
		this.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
			console.log("Check");
		});
	}
}