class endGame extends Phaser.Scene {
	constructor() {
		super("endGame");
	}
	
	preload(){
		//images
		this.load.image('endBanner', 'assets/images/banner.png');
		this.load.image('background','assets/images/menutlo.png');
		this.load.image('button_back', 'assets/images/button_back.png');
		this.load.image('button_back_pressed', 'assets/images/button_back_pressed.png');
		this.load.image('textBar', 'assets/images/textBar.png');
		
		//audio
		this.load.audio('click', ['assets/sounds/pickup.mp3', 'assets/sounds/pickup.ogg']);
		this.load.audio('explosion', ['assets/sounds/explosion.mp3', 'assets/sounds/explosion.ogg']);
		this.load.audio('winningSound', ['assets/sounds/winningSound.mp3', 'assets/sounds/winningSound.ogg']);
	}
	
	create(data){
		//top!
		this.scene.bringToTop();
		
		//background & banner
		this.background = this.add.tileSprite(0, 0, 2560, 1440, "background");
		this.background.setScale(config.width/1280);
		var endBanner = this.add.image(config.width/2, config.height/4, 'endBanner');
		endBanner.setScale(0.75);
		
		//audio
		var explosion = this.sound.add('explosion', { volume: config.vol * 0.3, loop: false });
		var click = this.sound.add('click', { volume: config.vol * 0.2, loop: false });
		var winningSound = this.sound.add('winningSound', { volume: config.vol * 0.2, loop: false });
		winningSound.play();
		
		//back button
		var button1 = this.add.image(config.width/2, config.height*(0.85), 'button_back');
		button1.setScale(0.5 * (config.width/1280));
		button1.setInteractive();
		
		//button functionality
		button1.on('pointerover', () => { explosion.play(); });
		button1.on('pointerout', () => { button1.setTexture("button_back"); });
		button1.on('pointerdown', () => { button1.setTexture("button_back_pressed"); winningSound.pause(); this.scene.start("Menu"); click.play(); });
		button1.on('pointerup', () => { button1.setTexture("button_back"); });
		
		//textBars
		var textBar1 = this.add.image(config.width/2, config.height*(0.65), 'textBar');
		var textBar2 = this.add.image(config.width/2, config.height*(0.55), 'textBar');
		var textBar3 = this.add.image(config.width/2, config.height*(0.45), 'textBar');
		
		//text
		this.timeText = this.add.bitmapText(config.width/2, config.height*(0.65), "pixelFont", 'Time elapsed: ' + (data.timeElapsed/1000).toFixed(2) + 's', 40).setOrigin(0.5);
		this.lapsText = this.add.bitmapText(config.width/2, config.height*(0.55), "pixelFont", 'Laps: ' + data.laps , 40, 1).setOrigin(0.5);
		this.positionText = this.add.bitmapText(config.width/2, config.height*(0.45), "pixelFont", 'Position: ' + data.position , 40).setOrigin(0.5);
	}
	
	update(){
		this.background.tilePositionX -= 0.15;
	}
}