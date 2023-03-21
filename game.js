/* RESOLUTIONS: (16:9)
    2160p: 3840×2160
    1440p: 2560×1440
    1080p: 1920×1080
    720p: 1280×720
    480p: 854×480
    360p: 640×360
    240p: 426×240 */

// game config
const config = {
	height: 720,
	width: 1280,
	mode: Phaser.Scale.SHOW_ALL,
    autoCenter: Phaser.Scale.CENTER_BOTH,
	backgroundColor: 0x000000,
	scene: [Menu, Scene1, Scene2, startCountdown, pauseGame, endGame],
	pixelArt: true,
	physics: {
		default: "arcade",
		arcade:
		{
			debug: false,
			debugShowVelocity: false
		}
	},
	// game volume
	vol: 1
}
// game instance
var game = new Phaser.Game(config);
