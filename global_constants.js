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
	PALETTE: 0
}

// Strings
module.exports.STRINGS = {
	HELP_DESCRIPTION_MAP_SCENE: "Go through each hotspot and count the number of each type of flower in each area. Once you have finished, come back to this screen to calculate the average population of each flower.",
	HELP_DESCRIPTION_HOTSPOT_SCENE: "I haven't written this yet."
}

// Cursors
module.exports.CURSORS = {
	ZOOM_CURSOR: 'url("' + module.exports.ASSET_PATHS.IMAGE + '/zoom.png") 22 8, pointer',
	ZOOM_ALERT_CURSOR: 'url("' + module.exports.ASSET_PATHS.IMAGE + '/zoomspotted.png") 22 8, pointer'
}

// Game Parameters
module.exports.PARAMS = {
	NUM_HOTSPOTS: 7,
	MAX_FLOWERS_PER_HOTSPOT: 20,
	MIN_FLOWERS_PER_HOTSPOT: 10,
	GRID_X_MAX: 16, //inclusive
	GRID_Y_MAX: 12, //inclusive
	QUADRAT_SIZE: 4, // in units
	QUADRAT_CHECKS_PER_HOTSPOT: 3,
	DISTANCE_UNIT: 50
}