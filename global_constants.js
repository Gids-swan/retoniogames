// Asset Paths
module.exports.ASSET_PATHS = {
	IMAGE: "assets/image",
	SOUND: "assets/sound"
};

// Display Values
module.exports.DISPLAY = {
	GAME_PADDING: 10,
	GAME_WIDTH: 800,
	GAME_HEIGHT: 600,
	UI_WIDTH: 225,
	UI_HEIGHT: 620,
	PADDED_GAME_WIDTH: ((2 * 10) + 800), // (2*GAME_PADDING) + GAME_WIDTH
}

// Strings
module.exports.STRINGS = {
	HOW_TO_PLAY: "How To Play",
	FINALE_1_TITLE: "Tally the Flowers!",
	FINALE_2_TITLE: "Find the Divisor!",
	FINALE_3_TITLE: "Calculate the Average!",
	HELP_DESCRIPTION_MAP_SCENE: "Go through each hotspot and count the number of each type of flower in each area.\n Once you have finished, come back to this screen to calculate the average population of each flower.",
	HELP_DESCRIPTION_HOTSPOT_SCENE: "Click and drag the quadrat around with the red circle. Use this to place the upper-left corner of the square on the coordinates specified in the white box. Then tally each flower using the counters on the side (flowers that graze the area count). Repeat for all sets of coordinates.",
	FINALE_1: "First, calculate the total amount of each flower found. Enter the values on the right hand side and press Submit.",
	FINALE_2: "Now, calculate the amount of quadrat areas that have been checked.\n",
	FINALE_2_HELPER_A: "\nNumber of hotspots: ",
	FINALE_2_HELPER_B: "\nNumber of area checks per hotspot: ",
	FINALE_3: "Finally, enter the average amount of flowers per metre squared on the right hand side (1 quadrat area = 1 metre squared). Round to the nearest whole number.\n\n",
	FINALE_3_HELPER_A: "Number of checks: ",
	CONGRATS_TITLE: "CONGRATULATIONS!",
	CONGRATS_TEXT: "You can choose to play again by clicking the button below!"
}

// Cursors
module.exports.CURSORS = {
	ZOOM_CURSOR: 'url("' + module.exports.ASSET_PATHS.IMAGE + '/zoom.png") 22 8, pointer',
	ZOOM_ALERT_CURSOR: 'url("' + module.exports.ASSET_PATHS.IMAGE + '/zoomspotted.png") 22 8, pointer'
}

// Game Parameters
module.exports.PARAMS = {
	NUM_HOTSPOTS: 4,
	MAX_FLOWERS_PER_HOTSPOT: 60,
	MIN_FLOWERS_PER_HOTSPOT: 10,
	GRID_X_MAX: 16, //inclusive
	GRID_Y_MAX: 12, //inclusive
	QUADRAT_SIZE: 4, // in units
	QUADRAT_CHECKS_PER_HOTSPOT: 2 	,
	DISTANCE_UNIT: 50
}