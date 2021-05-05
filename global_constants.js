// Asset Paths
const IMAGE_ASSET_PATH = "assets/image"
const SOUND_ASSET_PATH = "assets/sound"

// Display Values
const GAME_PADDING = 10;
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const UI_WIDTH = 225;
const UI_HEIGHT = 620;

const PADDED_GAME_WIDTH = (2*GAME_PADDING) + GAME_WIDTH;

// Strings
const HELP_DESCRIPTION_MAP_SCENE = "Go through each hotspot and count the number of each type of flower in each area. Once you have finished, come back to this screen to calculate the average population of each flower.";
const HELP_DESCRIPTION_HOTSPOT_SCENE = "I haven't written this yet.";

// Cursors
const ZOOM_CURSOR = 'url("' + IMAGE_ASSET_PATH + '/zoom.png") 22 8, pointer';
const ZOOM_ALERT_CURSOR = 'url("' + IMAGE_ASSET_PATH + '/zoomspotted.png") 22 8, pointer';

// Game Parameters
const NUM_HOTSPOTS = 7;
const MAX_FLOWERS_PER_HOTSPOT = 20;
const MIN_FLOWERS_PER_HOTSPOT = 10;
const GRID_X_MAX = 16; //inclusive
const GRID_Y_MAX = 12; //inclusive
const QUADRAT_SIZE = 4; // in units
const QUADRAT_CHECKS_PER_HOTSPOT = 3;