class pauseGame extends Phaser.Scene {
	constructor() {
		super("pauseGame");
	}

	preload()
	{
		//NIGGET
		this.load.image('button_back', 'assets/images/button_back.png');
		this.load.image('button_back_pressed', 'assets/images/button_back_pressed.png');
		this.load.image('button_play', 'assets/images/button_play.png');
		this.load.image('button_play_pressed', 'assets/images/button_play_pressed.png');
		this.load.image('button_volumeUp', 'assets/images/button_volumeUp.png');
		this.load.image('button_volumeUp_pressed', 'assets/images/button_volumeUp_pressed.png');
		this.load.image('button_volumeDown', 'assets/images/button_volumeDown.png');
		this.load.image('button_volumeDown_pressed', 'assets/images/button_volumeDown_pressed.png');
		this.load.image('pauseScreen', 'assets/images/pauseScreen.png');
		this.load.image('banner', 'assets/images/banner.png');
		
		//key esc
		this.keyESC;
		this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
	}

	create()
    {
		this.scene.bringToTop();
		
		//audio
		var explosion = this.sound.add('explosion', { volume: config.vol * 0.3, loop: false });
		var click = this.sound.add('click', { volume: config.vol * 0.2, loop: false });
		
		//buttons
		var pauseScreen = this.add.image(this.cameras.main.x + (config.width / 2), this.cameras.main.y + (config.height / 2) + 80, "pauseScreen");
		pauseScreen.setScale(0.5 * config.width/1280);
		var pauseBanner = this.add.image(this.cameras.main.x + (config.width / 2), this.cameras.main.y + (config.height / 2) - 160, "banner");
		pauseBanner.setScale(0.6 * config.width/1280);
		var button1 = this.add.image(this.cameras.main.x + (config.width / 2), this.cameras.main.y + (config.height / 2), "button_play");
		button1.setScale(0.5 * (config.width/1280));
		button1.setInteractive();
		var button2 = this.add.image(this.cameras.main.x + (config.width / 2) + 84, button1.y + (96 + 10), "button_volumeUp");
		button2.setScale(0.5 * (config.width/1280));
		button2.setInteractive();
		var button3 = this.add.image(this.cameras.main.x + (config.width / 2) - 84, button1.y + (96 + 10), "button_volumeDown");
		button3.setScale(0.5 * (config.width/1280));
		button3.setInteractive();
		var button4 = this.add.image(this.cameras.main.x + (config.width / 2), button1.y + 2 * (96 + 10), "button_back");
		button4.setScale(0.5 * (config.width/1280));
		button4.setInteractive();
		
		
		button1.on('pointerover', () => { explosion.play(); });
		button1.on('pointerout', () => { button1.setTexture("button_play"); });
		button1.on('pointerdown', () => 
		{
			button1.setTexture("button_play_pressed");
			click.play();
			this.scene.resume('playGame');
			this.scene.stop('pauseGame');
		});
		button1.on('pointerup', () => { button1.setTexture("button_play"); });
		
		button2.on('pointerover', () => { explosion.play(); });
		button2.on('pointerout', () => { button2.setTexture("button_volumeUp"); });
		button2.on('pointerup', () => { button2.setTexture("button_volumeUp"); });
		button2.on('pointerdown', () => 
		{ 
			button2.setTexture("button_volumeUp_pressed");
			click.play();
			config.vol = +((config.vol + 0.1).toFixed(1));		
			if(config.vol >= 4) 
			{
				config.vol = 4;
			}			
		});
		
		button3.on('pointerover', () => { explosion.play(); });
		button3.on('pointerout', () => { button3.setTexture("button_volumeDown"); });
		button3.on('pointerup', () => { button3.setTexture("button_volumeDown"); });
		button3.on('pointerdown', () => 
		{ 
			button3.setTexture("button_volumeDown_pressed"); 
			click.play();
			config.vol = +((config.vol - 0.1).toFixed(1));		
			if(config.vol < 0) 
			{
				config.vol = 0;
			}
		});
		
		button4.on('pointerover', () => { explosion.play(); });
		button4.on('pointerout', () => { button4.setTexture("button_back"); });
		button4.on('pointerup', () => { button4.setTexture("button_back"); });
		button4.on('pointerdown', () => 
		{
			button4.setTexture("button_back_pressed"); 
			this.scene.start("Menu");
			click.play(); 
			this.scene.stop("pauseMenu")
		;});
	}
	
	update()
	{
		if(this.keyESC.isDown)
		{
			this.scene.resume('playGame');
			this.scene.stop('pauseGame');
		}
	}
}
