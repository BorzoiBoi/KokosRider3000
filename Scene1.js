class Scene1 extends Phaser.Scene {
    constructor() {
		super("bootGame");
	}
	
    preload(){
		
		this.load.image("hud", "assets/images/hud.png");
		//
		this.load.image("player", "assets/images/cars/bluecarN.png",{
			frameWidth: 10,
			frameHeight: 13
		});
		this.load.image("routePoint", "assets/images/routePoint.png",{
			frameWidth: 16,
			frameHeight: 16
		});
		this.load.image("redcarN", "assets/images/cars/redcarN.png",{
			frameWidth: 10,
			frameHeight: 13
		});
		this.load.image("greencarN", "assets/images/cars/greencarN.png",{
			frameWidth: 10,
			frameHeight: 13
		});
		this.load.image("yellowcarN", "assets/images/cars/yellowcarN.png",{
			frameWidth: 10,
			frameHeight: 13
		});
		this.load.image("bluecarW", "assets/images/cars/bluecarNW.png",{
			frameWidth: 16,
			frameHeight: 16
		});
		this.load.image("bluecarE", "assets/images/cars/bluecarNE.png",{
			frameWidth: 16,
			frameHeight: 16
		});
			this.load.image("spedometer", "assets/images/spedometer.png",{
			frameWidth: 16,
			frameHeight: 16
		});
		this.load.image("nitrometer", "assets/images/nitrometer.png",{
			frameWidth: 16,
			frameHeight: 16
		});
		this.load.image("checkedPointV", "assets/images/checkedPointV.png");
		this.load.image("checkpointV", "assets/images/checkpointV.png");
		this.load.image("finishlineV", "assets/images/FinishLineV.png");
		this.load.image("checkedPointD", "assets/images/checkedPointD.png");
		this.load.image("checkpointD", "assets/images/checkpointD.png");
		this.load.image("smoke", "assets/spritesheets/smoke.png");
		this.load.image("flames", "assets/spritesheets/flames.png");
		this.load.image("nitroHud", "assets/images/nitroHud.png");
		this.load.image("nitroHudTop", "assets/images/nitroHudTop.png");
        this.load.image('nugt', 'assets/images/nugget_negative.png');

		// loading the font files
		this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");

		//tilemapka :33 <333 !!!! DASDASDASDASDAS AAA <3<3<3 :333
		//assets/tiles/ + nazwamapy + .json
		this.load.image("tiles","assets/tiles/tileset1.png");
		this.load.tilemapTiledJSON('map1', "assets/maps/beachMap.json");
		this.load.tilemapTiledJSON('map2', "assets/maps/beachMap2.json");
		this.load.tilemapTiledJSON('map3', "assets/maps/beachMap3.json");
		this.load.tilemapTiledJSON('map4', "assets/maps/beachMap4.json");
		this.load.tilemapTiledJSON('map5', "assets/maps/beachMap5.json");
		this.load.tilemapTiledJSON('map6', "assets/maps/beachMap6.json");

		this.load.audio('InitialD', ['assets/sounds/InitialD.mp3', 'assets/sounds/InitialD.ogg']);	
  }

	create(data) {
		this.add.text(20, 20, "Loading game...");
		this.scene.start("playGame", { mapKey: data.mapKey } );
		this.scene.stop();
	}

}
