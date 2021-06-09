require('./phaser.js');
const DISPLAY = require('./global_constants.js').DISPLAY;
const mapScene = require('./mapscene.js').mapScene;
const hotspotScene = require('./hotspotscene.js').hotspotScene;

var config = {
    type: Phaser.CANVAS,
    width: DISPLAY.PADDED_GAME_WIDTH + DISPLAY.UI_WIDTH,
    height: (2 * DISPLAY.GAME_PADDING + DISPLAY.GAME_HEIGHT),
    parent: "game",
    //physics: {
       // default: 'arcade',
        //arcade: {
            //gravity: { y: 150 }
        //}
    //},
	backgroundColor: "#5DACD8",
    scene: [ mapScene, hotspotScene ]
};

var game = new Phaser.Game(config);

