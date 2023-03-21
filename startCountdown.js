class startCountdown extends Phaser.Scene {
	constructor() {
		super("startCountdown");
	}
	
	preload(){
		//images
		this.load.image('startingLights0', 'assets/images/startingLights0.png');
		this.load.image('startingLights1', 'assets/images/startingLights1.png');
		this.load.image('startingLights2', 'assets/images/startingLights2.png');
		this.load.image('startingLights3', 'assets/images/startingLights3.png');
		this.load.image('startingLights4', 'assets/images/startingLights4.png');
		
		//audio
		this.load.audio('countdownBeep', ['assets/sounds/countdownBeep.mp3', 'assets/sounds/countdownBeep.ogg']);
		this.load.audio('startBeep', ['assets/sounds/startBeep.mp3', 'assets/sounds/startBeep.ogg']);
		}
		
	create(){
		this.scene.bringToTop();
		
		//lights image
		this.timeElapsed = 0;
		this.count = 0;
		this.lights = this.add.image(this.cameras.main.x + (config.width / 2), this.cameras.main.y + 80, 'startingLights0');
		this.lights.setScale(5);
		this.lights.setScrollFactor(0,0);
		
		//beeps
		this.startBeep = this.sound.add('startBeep', { volume: config.vol * 0.5, loop: false });
		this.countdownBeep = this.sound.add('countdownBeep', { volume: config.vol * 0.5, loop: false });
	}
	
	update(delta, time){
		this.timeElapsed += (time * 0.001);
		if(this.timeElapsed >= 1 && this.count < 1)
		{
			this.count++;
			this.countdownBeep.play();
			this.lights.setTexture('startingLights1');
		}
		if(this.timeElapsed > 2 && this.count < 2)
		{
			this.count++;
			this.countdownBeep.play();
			this.lights.setTexture('startingLights2');
		}
		if(this.timeElapsed > 3 && this.count < 3)
		{
			this.count++;
			this.countdownBeep.play();
			this.lights.setTexture('startingLights3');
		}
		if(this.timeElapsed > 4 && this.count < 4)
		{
			this.count++;
			this.startBeep.play();
			this.lights.setTexture('startingLights4');
			this.scene.resume('playGame');
		}
		if(this.count >= 4)
		{
			this.lights.y -= 5;
		}
		if(this.timeElapsed > 5)
		{
			this.count++;
			this.lights.destroy();
			this.timeElapsed = 0;
			this.count = 0;
			this.scene.stop();
		}
	}
}