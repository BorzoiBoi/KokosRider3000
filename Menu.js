class Menu extends Phaser.Scene {
	constructor() {
		super("Menu");
	}
	
	preload() {
		//tlo i przycisk
		this.load.image('button', 'assets/images/button.png');
		this.load.image('button_pressed', 'assets/images/button_pressed.png');
		this.load.image('button_credits', 'assets/images/button_credits.png');
		this.load.image('button_credits_pressed', 'assets/images/button_credits_pressed.png');
		this.load.image('button_info', 'assets/images/button_info.png');
		this.load.image('button_info_pressed', 'assets/images/button_info_pressed.png');
		this.load.image('button_big', 'assets/images/button_big.png');
		this.load.image('button_big_pressed', 'assets/images/button_big_pressed.png');
		this.load.image('button_map1', 'assets/images/button_map1.png');
		this.load.image('button_map1_pressed', 'assets/images/button_map1_pressed.png');
		this.load.image('button_map2', 'assets/images/button_map2.png');
		this.load.image('button_map2_pressed', 'assets/images/button_map2_pressed.png');
		this.load.image('button_map3', 'assets/images/button_map3.png');
		this.load.image('button_map3_pressed', 'assets/images/button_map3_pressed.png');
		this.load.image('button_play', 'assets/images/button_play.png');
		this.load.image('button_play_pressed', 'assets/images/button_play_pressed.png');
		this.load.image('button_options', 'assets/images/button_options.png');
		this.load.image('button_options_pressed', 'assets/images/button_options_pressed.png');
		this.load.image('button_back', 'assets/images/button_back.png');
		this.load.image('button_back_pressed', 'assets/images/button_back_pressed.png');
		this.load.image('button_mute', 'assets/images/button_mute.png');
		this.load.image('button_mute_pressed', 'assets/images/button_mute_pressed.png');
		this.load.image('button_volumeUp', 'assets/images/button_volumeUp.png');
		this.load.image('button_volumeUp_pressed', 'assets/images/button_volumeUp_pressed.png');
		this.load.image('button_volumeDown', 'assets/images/button_volumeDown.png');
		this.load.image('button_volumeDown_pressed', 'assets/images/button_volumeDown_pressed.png');
		this.load.image('maps_banner', 'assets/images/maps_banner.png');
		this.load.image('banner', 'assets/images/banner.png');
		this.load.image('credits_banner', 'assets/images/credits_banner.png');
		this.load.image('alternative_banner', 'assets/images/alternative_banner.png');
		this.load.image('options_banner', 'assets/images/options_banner.png');
		this.load.image('background','assets/images/menutlo.png');
		this.load.image('palm1','assets/images/palm1.png');
		this.load.image('palm2','assets/images/palm2.png');
		this.load.image('arrowUp','assets/images/arrowUp.png');
		this.load.image('infoScreen', 'assets/images/pauseScreen.png');
		this.load.image('info', 'assets/images/info.png');
		this.load.image('info_banner', 'assets/images/info_banner.png');
		this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");

		//audio
		this.load.audio('theme', ['assets/sounds/theme.mp3', 'assets/sounds/theme.ogg']);
		this.load.audio('explosion', ['assets/sounds/explosion.mp3', 'assets/sounds/explosion.ogg']);
		this.load.audio('click', ['assets/sounds/pickup.mp3', 'assets/sounds/pickup.ogg']);
	}
	
	create() {
		//scene to top
		this.scene.bringToTop();
		this.map = "map1";

		//scrolling camera
		this.scrollLeft = false;
		this.scrollRight = false;
		this.destinatonSet = false;
		
		//Audio
		var theme = this.sound.add('theme', { volume: config.vol * 0.1, loop: false });
		var explosion = this.sound.add('explosion', { volume: config.vol * 0.3, loop: false });
		var click = this.sound.add('click', { volume: config.vol * 0.2, loop: false });
		theme.play();
		
		//Background 
		this.background = this.add.tileSprite(0, 0, config.width*4, config.height*2, "background");
		this.background.setScale(config.width/1280);
		this.palm1 = this.add.image((config.width/2)-(config.width/8), config.height/2, 'palm1');
		this.palm1.setScale(0.3 * (config.width/1280));
		this.palm2 = this.add.image((config.width/2)+(config.width/8), config.height/2, 'palm2');
		this.palm2.setScale(0.3 * (config.width/1280));
		this.palm3 = this.add.image(0 - (config.width/1.1)+(config.width/7), config.height/2, 'palm2');
		this.palm3.setScale(0.25 * (config.width/1280));
		this.palm4 = this.add.image(config.width/1280 + config.width * 1.3, config.height/2, 'palm1');
		this.palm4.setScale(0.4 * (config.width/1280));
		this.palm5 = this.add.image(config.width * 1.8, config.height/2, 'palm2');
		this.palm5.setScale(0.25 * (config.width/1280));
		this.palm6 = this.add.image(config.width * 0.8, -(config.height/2), 'palm2');
		this.palm6.setScale(0.25 * (config.width/1280));
		this.palm7 = this.add.image(config.width * 0.2, -(config.height/2.4), 'palm1');
		this.palm7.setScale(0.4 * (config.width/1280));
		
		//credits screen
		this.creditsScreen = this.add.image(-config.width/2, -config.height * 0.52, "infoScreen");
		this.creditsScreen.setRotation(1.571);
		this.creditsScreen.setScale(0.55,1.25);
		this.creditsBanner = this.add.image(-config.width/2, -config.height * 0.8, "credits_banner");
		
		//info screen
		this.infoScreen = this.add.image(config.width/2, -(config.height * 0.6), "infoScreen");
		this.infoScreen.setScale(0.7 * (config.width/1280));
		this.info = this.add.image(config.width/2, -(config.height * 0.5), "info");
		this.info.setScale(0.5 * (config.width/1280));
		
		//BANNER
		this.banner = this.add.image(config.width/2, config.height/4, "banner");
		this.banner.setScale(0.9 * (config.width/1280));
		this.options_banner = this.add.image(0 - config.width/2, config.height/4, "options_banner");
		this.options_banner.setScale(1 * (config.width/1280));
		this.maps_banner = this.add.image(config.width + config.width/2, config.height/6.5, "maps_banner");
		this.maps_banner.setScale(0.8 * (config.width/1280));
		this.info_banner = this.add.image(config.width/2, -(config.height * 0.85), "info_banner");
		this.info_banner.setScale(0.7 * (config.width/1280));
		this.alternative_banner = this.add.image(config.width * 1.5, (config.height * 0.51), "alternative_banner");
		this.alternative_banner.setScale(0.6 * (config.width/1280));
		
		//text
		this.creditsText = this.add.bitmapText(-config.width/2, -config.height/2, "pixelFont", "Credits:\nCars: Mini Pixel Pack 2 - GrafxKid (grafxkid.itch.io)\nMap gfx: Four Seasons Platformer Tileset - Rotting Pixels (rottingpixels.itch.io)\nTime Fantasy Beach Tiles - FinalBossBlues (finalbossblues.itch.io)\nSerene Village revamped - LimeZu (limezu.itch.io)\nMenu Simple Keys Asset Pack - beamedeighth (beamedeighth.itch.io)\nBeach Background - katemangostar (freepik.com/autor/katemangostar)\nPixellari font - Zacchary Dempsey-Plante (ztdp.ca)\nlogo: https://www.thefancytext.com/png-text-generator\n\n+ Special thanks to Handlara for help with some of the custom art", 32).setOrigin(0.5);
		this.versionText = this.add.bitmapText(config.width - 10, config.height - 48, "pixelFont", 'Version: 1.3.1 (shaky)', 32).setOrigin(1);
		this.autorText = this.add.bitmapText(config.width - 10, config.height - 16, "pixelFont", "Julcia, Stanislaw W-P, Dawid", 32).setOrigin(1);
		
		//Menu buttons
		var button = this.add.image(config.width/2, config.height*(0.85), 'button_info');
		button.setScale(0.5 * (config.width/1280));
		button.setInteractive();
		var button2 = this.add.image(config.width/2, (button.y - (config.height/8) - 20), 'button_options');
		button2.setInteractive();
		button2.setScale(0.5 * (config.width/1280));
		var button3 = this.add.image(config.width/2, (button2.y - (config.height/8) - 20), 'button_play');
		button3.setInteractive();
		button3.setScale(0.5 * (config.width/1280));
		var button13 = this.add.image(config.width/2, -config.height*(0.15), 'button_back');
		button13.setScale(0.5 * (config.width/1280));
		button13.setInteractive();
		var button17 = this.add.image(config.width * 0.1, config.height*(0.85), 'button_credits');
		button17.setScale(0.5 * (config.width/1280));
		button17.setInteractive();
		var button18 = this.add.image(-config.width/2, -config.height*(0.15), 'button_back');
		button18.setScale(0.5 * (config.width/1280));
		button18.setInteractive();
		
		//credits buttons functionality
		button17.on('pointerover', () => { explosion.play(); });
		button17.on('pointerout', () => { button17.setTexture("button_credits"); });
		button17.on('pointerup', () => { button17.setTexture("button_credits"); });
		button17.on('pointerdown', () => { button17.setTexture("button_credits_pressed"); click.play(); this.cameras.main.setScroll(-config.width, -config.height); });
		
		button18.on('pointerover', () => { explosion.play(); });
		button18.on('pointerout', () => { button18.setTexture("button_back"); });
		button18.on('pointerup', () => { button18.setTexture("button_back"); });
		button18.on('pointerdown', () => { button18.setTexture("button_back_pressed"); click.play(); this.cameras.main.setScroll(0, 0); });
		
		//menu buttons funcionality
		button.on('pointerover', () => { explosion.play(); });
		button.on('pointerout', () => { button.setTexture("button_info"); });
		button.on('pointerdown', () => {
			button.setTexture("button_info_pressed");
			click.play();
			this.cameras.main.setScroll(0, -config.height);
			});
		button.on('pointerup', () => { button.setTexture("button_info"); });
		
		button2.on('pointerover', () => { explosion.play(); });
		button2.on('pointerout', () => { button2.setTexture("button_options"); });
		button2.on('pointerup', () => { button2.setTexture("button_options"); });
		button2.on('pointerdown', () => { button2.setTexture("button_options_pressed");  click.play(); this.scrollLeft = true; });
		
		button3.on('pointerover', () => { explosion.play(); });
		button3.on('pointerout', () => { button3.setTexture("button_play"); });
		button3.on('pointerup', () => { button3.setTexture("button_play"); });
		button3.on('pointerdown', () => { button3.setTexture("button_play_pressed"); click.play(); this.scrollRight = true;});
		
		button13.on('pointerover', () => { explosion.play(); });
		button13.on('pointerout', () => { button13.setTexture("button_back"); });
		button13.on('pointerup', () => { button13.setTexture("button_back"); });
		button13.on('pointerdown', () => { button13.setTexture("button_back_pressed"); click.play(); this.cameras.main.setScroll(0, 0) });
		
		//Maps buttons
		var button8 = this.add.image(config.width + config.width/4, config.height * 0.35, 'button_map1_pressed');
		button8.setScale(0.35 * (config.width/1280));
		button8.setInteractive();
		var button9 = this.add.image(config.width + config.width/2, config.height * 0.35, 'button_map2');
		button9.setInteractive();
		button9.setScale(0.35 * (config.width/1280));
		var button10 = this.add.image(config.width + config.width * 0.75, config.height * 0.35, 'button_map3');
		button10.setInteractive();
		button10.setScale(0.35 * (config.width/1280));
		
		//remixed maps butts
		var button14 = this.add.image(config.width + config.width/4, config.height * 0.66, 'button_map1');
		button14.setScale(0.35 * (config.width/1280));
		button14.setInteractive();
		var button15 = this.add.image(config.width + config.width/2, config.height * 0.66, 'button_map2');
		button15.setInteractive();
		button15.setScale(0.35 * (config.width/1280));
		var button16 = this.add.image(config.width + config.width * 0.75, config.height * 0.66, 'button_map3');
		button16.setInteractive();
		button16.setScale(0.35 * (config.width/1280));
		
		//maps play and back
		var button11 = this.add.image(config.width + config.width * 0.35, (config.height * 0.85), 'button_back');
		button11.setInteractive();
		button11.setScale(0.5 * (config.width/1280));
		var button12 = this.add.image(config.width + config.width * 0.65, (config.height * 0.85), 'button_play');
		button12.setInteractive();
		button12.setScale(0.5 * (config.width/1280));
		
		//maps buttons funcionality
		button8.on('pointerover', () => { explosion.play(); });
		button8.on('pointerdown', () => { 
			button8.setTexture("button_map1_pressed");
			this.map = "map1";		
			click.play();
			button9.setTexture("button_map2");
			button10.setTexture("button_map3");
			button14.setTexture("button_map1");
			button15.setTexture("button_map2");
			button16.setTexture("button_map3");
		});
		
		button9.on('pointerover', () => { explosion.play(); });
		button9.on('pointerdown', () => { 
			button9.setTexture("button_map2_pressed"); 
			this.map = "map2";
			click.play();
			button8.setTexture("button_map1");
			button10.setTexture("button_map3");
			button14.setTexture("button_map1");
			button15.setTexture("button_map2");
			button16.setTexture("button_map3");
		});
		
		button10.on('pointerover', () => { explosion.play(); });
		button10.on('pointerdown', () => { 
			button10.setTexture("button_map3_pressed"); 
			this.map = "map3";
			click.play(); 
			button8.setTexture("button_map1");
			button9.setTexture("button_map2");
			button14.setTexture("button_map1");
			button15.setTexture("button_map2");
			button16.setTexture("button_map3");
		});
		
		//remixed maps buttons funcionality
		button14.on('pointerover', () => { explosion.play(); });
		button14.on('pointerdown', () => { 
			button14.setTexture("button_map1_pressed");
			this.map = "map4";		
			click.play();
			button8.setTexture("button_map1");
			button9.setTexture("button_map2");
			button10.setTexture("button_map3");
			button15.setTexture("button_map2");
			button16.setTexture("button_map3");
		});
		
		button15.on('pointerover', () => { explosion.play(); });
		button15.on('pointerdown', () => { 
			button15.setTexture("button_map2_pressed");
			this.map = "map5";		
			click.play();
			button8.setTexture("button_map1");
			button9.setTexture("button_map2");
			button10.setTexture("button_map3");
			button14.setTexture("button_map1");
			button16.setTexture("button_map3");
		});
		
		button16.on('pointerover', () => { explosion.play(); });
		button16.on('pointerdown', () => { 
			button16.setTexture("button_map3_pressed");
			this.map = "map6";		
			click.play();
			button8.setTexture("button_map1");
			button9.setTexture("button_map2");
			button10.setTexture("button_map3");
			button14.setTexture("button_map1");
			button15.setTexture("button_map2");
		});
		
		//maps play and back func
		button11.on('pointerover', () => { explosion.play(); });
		button11.on('pointerout', () => { button4.setTexture("button_back"); });
		button11.on('pointerup', () => { button4.setTexture("button_back"); });
		button11.on('pointerdown', () => { button4.setTexture("button_back_pressed"); click.play(); this.scrollLeft = true; });
		
		button12.on('pointerover', () => { explosion.play(); });
		button12.on('pointerout', () => { button4.setTexture("button_play"); });
		button12.on('pointerup', () => { button4.setTexture("button_play"); });
		button12.on('pointerdown', () => { 
			button4.setTexture("button_play_pressed");
			click.play();
			theme.stop(); 
			this.scene.start('bootGame', { mapKey: this.map });
		});
		
		//options buttons
		var button4 = this.add.image(0 - config.width/2, config.height*(0.85), 'button_back');
		button4.setScale(0.5 * (config.width/1280));
		button4.setInteractive();
		
		//mute button temp
		var button5 = this.add.image(0 - config.width/2, (button4.y - (config.height/8) - 20), 'button_mute');
		button5.setScale(0.5 * (config.width/1280));
		button5.setInteractive();
		
		//volume up button temp
		var button6 = this.add.image(0 - config.width/2 + 84, (button5.y - (config.height/8) - 20), 'button_volumeUp');
		button6.setScale(0.5 * (config.width/1280));
		button6.setInteractive();
		
		//volume down button temp
		var button7 = this.add.image(0 - config.width/2 - 84, (button5.y - (config.height/8) - 20), 'button_volumeDown');
		button7.setScale(0.5 * (config.width/1280));
		button7.setInteractive();
		
		//options buttons funcionality
		button4.on('pointerover', () => { explosion.play(); });
		button4.on('pointerout', () => { button4.setTexture("button_back"); });
		button4.on('pointerup', () => { button4.setTexture("button_back"); });
		button4.on('pointerdown', () => { button4.setTexture("button_back_pressed");  click.play(); this.scrollRight = true; });
		
		//mute button funcionality
		button5.on('pointerover', () => { explosion.play(); });
		//button5.on('pointerout', () => {});
		//button5.on('pointerup', () => {});
		button5.on('pointerdown', () => {
			click.play(); 
			if(config.vol == 0) {
				config.vol = 1;
				theme.volume = 0.1 * config.vol; explosion.volume = 0.2 * config.vol; click.volume = 0.3 * config.vol;
				button5.setTexture("button_mute");
				click.play();
			}
			else
			{
				config.vol = 0;
				theme.volume = 0.1 * config.vol; explosion.volume = 0.2 * config.vol; click.volume = 0.3 * config.vol;
				button5.setTexture("button_mute_pressed");
			}
		});
		
		//volume up button functionality
		button6.on('pointerover', () => { explosion.play(); });
		button6.on('pointerout', () => { button6.setTexture("button_volumeUp"); });
		button6.on('pointerup', () => { button6.setTexture("button_volumeUp"); });
		button6.on('pointerdown', () => { 
			button6.setTexture("button_volumeUp_pressed");
			click.play(); 
			//concatenation sucks
			config.vol = +((config.vol + 0.1).toFixed(1));
			if(config.vol > 4) {
				config.vol = 4;
			}
			theme.volume = 0.1 * config.vol; explosion.volume = 0.2 * config.vol; click.volume = 0.3 * config.vol;
		});

		//volume down button functionality
		button7.on('pointerover', () => { explosion.play(); });
		button7.on('pointerout', () => { button7.setTexture("button_volumeDown"); });
		button7.on('pointerup', () => { button7.setTexture("button_volumeDown"); });
		button7.on('pointerdown', () => {
			button7.setTexture("button_volumeDown_pressed");
			click.play(); 
			config.vol = +((config.vol - 0.1).toFixed(1));		
			if(config.vol < 0) {
				config.vol = 0;
			}
			theme.volume = 0.1 * config.vol; explosion.volume = 0.2 * config.vol; click.volume = 0.3 * config.vol;
		});
	} 
	
	//obsluga przesuwania ekranu
	moveScreenRight()
	{
		this.cameras.main.setScroll(this.cameras.main.scrollX + 45, 0);
		if(this.cameras.main.scrollX >= this.destination)
		{
			this.cameras.main.setScroll(this.destination, 0);
			this.scrollRight = false;
			this.destinationSet = false;
		}
	}
	
	moveScreenLeft()
	{
		this.cameras.main.setScroll(this.cameras.main.scrollX - 45, 0);
		if(this.cameras.main.scrollX <= this.destination)
		{
			this.cameras.main.setScroll(this.destination, 0);
			this.scrollLeft = false;
			this.destinationSet = false;
		}
	}
	
	update() {
		this.background.tilePositionX -= 0.15;
		this.palm1.x -=0.2;
		this.palm2.x +=0.2;
		this.palm3.x +=0.15;
		this.palm4.x +=0.12;
		this.palm5.x -=0.16;
		this.palm6.x -=0.08;
		this.palm7.x +=0.05;
		
		//przesuwanie ekranu
		if(this.scrollRight)
		{
			this.scrollLeft = false;
		}
		if(this.scrollLeft)
		{
			if(!this.destinationSet)
			{
				this.destination = this.cameras.main.scrollX - config.width;
				this.destinationSet = true;
			}
			this.moveScreenLeft();
		}
		if(this.scrollRight)
		{
			if(!this.destinationSet)
			{
				this.destination = this.cameras.main.scrollX + config.width;
				this.destinationSet = true;
			}
			this.moveScreenRight();
		}
	}
}