class Scene2 extends Phaser.Scene {
    constructor() {
		super("playGame");
	}

    create(data) {
		//magic numbas
		this.pause = false;
		this.gameEnd = false;
		this.scene.bringToTop();
		this.timeElapsed = 0;
		this.lapsToDo = 3;
		this.position = 1;
		
		//definign esc key AAAAAAAA
		this.keyESC;
		this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
		
		//ladowanie mapy
		this.lapCount = 0;
		this.physics.world.setBounds(0, 0, 2560, 1440, true, true, true, true);
		this.physics.world.setBoundsCollision();
		const map = this.make.tilemap({key: data.mapKey, tileWidth: 16, tileHeight: 16});
		const tileset = map.addTilesetImage("beachTileset","tiles")
		const layer = map.createLayer("background", tileset, 0, 0);
		const grasslayer = map.createLayer("grass", tileset, 0, 0);
		const roadlayer = map.createLayer("road", tileset, 0, 0);
			
		//rozstawianie trasy dla AI (objectlayer route)
		//routepoint: this(scene), X, Y, texture, isVisible
		this.routePoints = this.physics.add.group();
		map.createFromObjects('route').forEach(element => {
			this.routePoints.add(new Routepoint(this, element.x, element.y, 'routePoint', false));
			element.destroy();
		});
		
		//grupa checkpointow i rozstawianie checkpointow, JUŻ NIE RĘCZNE! :DDD
		//checkpoint: this(scene), X, Y, texture, isHorizontal, isFinish
		this.checkpointGroup = this.physics.add.group();
		var checkpointArray = map.createFromObjects('checkpoints').forEach(element => {
			if(element.data.list.isFinish) //finish musi być poziomo, bo nie zrobilem pionowej tekstury!
			{
				this.checkpointGroup.add(new Checkpoint(this, element.x, element.y, 'finishlineV', false, true));
			}
			else if(element.data.list.isVertical)
			{
				this.checkpointGroup.add(new Checkpoint(this, element.x, element.y-11, 'checkpointD', true, false));
			}
			else
			{
				this.checkpointGroup.add(new Checkpoint(this, element.x, element.y, 'checkpointV', false, false));
			}
			element.destroy();
		});
		var startingPoint = this.checkpointGroup.getChildren()[0]; //zmienna żeby łatwiej było ustawić gracza i boty 
		
		//particle?
		var particles = this.add.particles('smoke');
		const emitter = particles.createEmitter({
			quantity: 1,
			speedX: { min: -10, max: 10 },
			speedY: { min: -50, max: -20 },
			accelerationY: { min: -5, max: -2 },
			scale: { min: 0.3, max: 0.5 },
			lifespan: { min: 400, max: 400 },
			rotate: { min: -20, max: 20 },
			frequency: 15
		});
		this.emitter = emitter;
		emitter.stop();
		
		//particle turbo
		var particles = this.add.particles('flames');
		const flameEmitter = particles.createEmitter({
			quantity: 1,
			speedX: { min: 0, max: 0 },
			speedY: { min: 0, max: 0 },
			scale: { min: 0.9, max: 1.1 },
			lifespan: { min: 500, max: 500 },
			frequency: 15
		});
		this.flameEmitter = flameEmitter;
		flameEmitter.stop();
		
		//respienie gracza + kolizja
		this.player = new Player(this, startingPoint.x + 15, startingPoint.y + 20, "player");
		this.player.penalty = 1;
		this.physics.add.overlap(this.player, this.checkpointGroup, this.checkThePoint, null, this);
		emitter.follow = this.player;
		flameEmitter.follow = this.player;
			
		//grupa ai
		this.aiCars = this.physics.add.group();
		this.physics.add.collider(this.player, this.aiCars);
		
		//respienie AI
		//EnemyCar: this(scene), X, Y, texture, route(ścieżka którą podąża)
		this.aiCars.add(new enemyCar(this, startingPoint.x - 15, startingPoint.y + 20, 'redcarN', this.routePoints.getChildren()));
		this.aiCars.add(new enemyCar(this, startingPoint.x + 15, startingPoint.y + 60, 'greencarN', this.routePoints.getChildren()));
		this.aiCars.add(new enemyCar(this, startingPoint.x - 15, startingPoint.y + 60, 'yellowcarN', this.routePoints.getChildren()));
		
		this.aiCars.getChildren().forEach( element => { this.physics.add.collider( element, this.aiCars ); });
		
		//klawiatura?
		this.cursorKeys = this.input.keyboard.createCursorKeys();
		
		//frontLayer po graczu
		const colidablelayer = map.createLayer("colidable", tileset, 0, 0);
		const frontlayer = map.createLayer("front", tileset, 0, 0);
			
		//colizja
		this.physics.add.collider(this.player,colidablelayer);
		colidablelayer.setCollisionBetween(1,1000);
		this.physics.add.collider(this.aiCars,colidablelayer);
		this.roadlayer = roadlayer;
		this.physics.add.overlap(this.player, this.checkpointGroup, null, null, this);
		
		//czarny (już niebieski :D) pasek u gory, hud
		this.hud = this.add.image(config.width/4 + 15, config.height/4 + 2, "hud");
		this.hud.setScrollFactor(0,0);
		//nitro
		this.nitroHud = this.add.image(config.width/4 + 15, config.height/2 + 5, "nitroHud");
		this.nitroHud.setScrollFactor(0,0);
		this.nitrometer = this.add.image(config.width/4 + 9, config.height/2 + 53, "nitrometer");
		this.nitrometer.setScrollFactor(0,0);
		this.nitrometer.setScale(0.71,0); //MAGIC NUMBAS!
		this.nitrometer.setOrigin(0, 0);
		this.nitroHudTop = this.add.image(config.width/4 + 15, config.height/2 + 5, "nitroHudTop");
		this.nitroHudTop.setScrollFactor(0,0);
		//the rest
		this.scoreLabel = this.add.bitmapText(config.width/4 + 15, config.height/4 + 2, "pixelFont", "", 16);
		this.scoreLabel.setScrollFactor(0,0);
		this.rotationLabel = this.add.bitmapText(config.width/4 + 115, config.height/4 + 2, "pixelFont", "", 16);
		this.rotationLabel.setScrollFactor(0,0);
		this.fpsLabel = this.add.bitmapText(config.width/4 + 215, config.height/4 + 2, "pixelFont", "", 16);
		this.fpsLabel.setScrollFactor(0,0);
		this.locationLabel = this.add.bitmapText(config.width/4 + 365, config.height/4 + 2, "pixelFont", "", 16);
		this.locationLabel.setScrollFactor(0,0);
		this.lapLabel = this.add.bitmapText(config.width/4 + 565, config.height/4 + 2, "pixelFont", "", 16);
		this.lapLabel.setScrollFactor(0,0);
		
		//audio
		this.InitialD = this.sound.add('InitialD', { volume: 0.03 * config.vol, loop: true });
		this.InitialD.play();
		
		//camera
		this.cameras.main.startFollow(this.player);
		//this.cameras.main.startFollow(this.aiCars.getChildren()[1]);
		this.cameras.main.zoom = 2;
		
		//countdown scene
		this.scene.pause();
		this.scene.launch('startCountdown');
	}

	//sprawdzanie checkpointów
	checkThePoint(player, checkpoint) {
		if(!checkpoint.checked && !checkpoint.isFinish)
		{
			checkpoint.checked = true;
			if(checkpoint.isVertical)
			{
				checkpoint.setTexture('checkedPointD');
			}
			else
			{
				checkpoint.setTexture('checkedPointV');
			}
			var click = this.sound.add('click', { volume: 1 * config.vol, loop: false });
			click.play();
		}
		else if(!checkpoint.checked && checkpoint.isFinish)
		{
			var allDone = true;
			this.checkpointGroup.getChildren().forEach(element => {
				if(!element.checked && !element.isFinish)
				allDone = false;
			});
			if(allDone)
			{
				var explosion = this.sound.add('explosion', { volume: 0.4 * config.vol, loop: false });
				explosion.play();
				this.checkpointGroup.getChildren().forEach(element => {
					if(!element.isFinish)
					{
						element.checked = false;
						if(element.isVertical)
						{
							element.setTexture('checkpointD');
						}
						else
						{
							element.setTexture('checkpointV');
						}
					}
				});
				this.lapCount++;
				if(this.lapCount == this.lapsToDo)
				{
					this.aiCars.getChildren().forEach( element => {
						if(element.lap >= this.lapsToDo)
						{
							this.position++;
						}
					});
					this.gameEnd = true;
				}
			}
		}
	}
	
	loadEndScreen()
	{
		this.InitialD.pause();
		this.scene.stop();
		this.scene.launch('endGame', { laps: this.lapsToDo, timeElapsed: this.timeElapsed, position: this.position });
	}

		//gameloop
	update(time, delta) {
		//game cycle
		this.timeElapsed += delta;
		this.InitialD.resume();
		this.emitter.stop();
		this.movePlayerManager();
		this.updateHUD(delta);
		this.aiCars.getChildren().forEach( element => { this.updateAiMovement(element) });
		//key?
		if(this.keyESC.isDown)
		{
			this.InitialD.pause();
			this.scene.pause();
			this.scene.launch('pauseGame');
		}
		if(this.gameEnd)
		{
			this.loadEndScreen();
		}
	}
  
    updateAiMovement(car)
	{
		//setting direction
		var rotation = car.getRadiansToPoint();
		var radiansUp = (Math.abs(0 - car.rotation) + Math.abs(0 - rotation));
		var radiansDown = (Math.abs(Math.PI - (Math.abs(car.rotation))) + Math.abs(Math.PI - (Math.abs(rotation))));
		if((car.rotation >= 0 && rotation >= 0) || (car.rotation <= 0 && rotation <= 0))
		{
			if(car.rotation > rotation)
			{
				car.setRotation(car.rotation - ((car.handling) * (car.currentSpeed/car.maxSpeed)));
			}
			if(car.rotation < rotation)
			{
				car.setRotation(car.rotation + ((car.handling) * (car.currentSpeed/car.maxSpeed)));
			}
		}
		else
		{
			//console.log("radiansUp: " + radiansUp + " radiansDown: " + radiansDown);
			if(radiansUp >= radiansDown)
			{
				if(car.rotation < 0)
				{
					car.setRotation(car.rotation - ((car.handling) * (car.currentSpeed/car.maxSpeed)));
				}
				else
				{
					car.setRotation(car.rotation + ((car.handling) * (car.currentSpeed/car.maxSpeed)));
				}
			}
			if(radiansUp <= radiansDown)
			{
				if(car.rotation < 0)
				{
					car.setRotation(car.rotation + ((car.handling) * (car.currentSpeed/car.maxSpeed)));
				}
				else
				{
					car.setRotation(car.rotation - ((car.handling) * (car.currentSpeed/car.maxSpeed)));
				}
			}
		}
		//checking if is on opint
		if(car.isOnPoint())
		{
			car.nextPoint();
		}
		//speed!
		if(car.currentSpeed < (car.penalty * car.maxSpeed))
		{
			car.currentSpeed += car.penalty * car.acceleration;
		}
		car.setVelocityY(-(car.currentSpeed) * Math.cos(car.rotation));
		car.setVelocityX((car.currentSpeed) * Math.sin(car.rotation));
		
		if (car.currentSpeed < 0)
		{
			if(car.currentSpeed > (car.penalty * car.backwardsMaxSpeed)-5)
			{
				car.currentSpeed += 5;
			}
		}
		else if(car.currentSpeed > (car.penalty * car.maxSpeed)+5)
		{
			if(car.currentSpeed > (car.penalty * car.maxSpeed))
			{
				car.currentSpeed -= 5;
			}
		}
		
		var tile = this.roadlayer.getTileAtWorldXY(car.x, car.y);
		if(tile == null)
		{
			car.penalty = 0.4;
		}
		else
		{
			car.penalty = 1;
		}
	}	  
  
    movePlayerManager()
    {
		//Skręcanie
    if (this.cursorKeys.left.isDown)
		{
			if(this.player.currentSpeed != 0)
			{
				if(this.cursorKeys.space.isDown)
				{
					this.player.setRotation(this.player.rotation - (1.2 * this.player.handling * (this.player.currentSpeed/this.player.maxSpeed)));
				}
				else
				{
					this.player.setRotation(this.player.rotation - (this.player.handling * (this.player.currentSpeed/this.player.maxSpeed)));
				}
			}
		} 
	else if (this.cursorKeys.right.isDown)
		{
			if(this.player.currentSpeed != 0)
			{
				if(this.cursorKeys.space.isDown)
				{
					this.player.setRotation(this.player.rotation + (1.2 * this.player.handling * (this.player.currentSpeed/this.player.maxSpeed)));
				}
				else
				{
					this.player.setRotation(this.player.rotation + (this.player.handling * (this.player.currentSpeed/this.player.maxSpeed)));
				}
			}
		}
		//Nitro
		if(this.cursorKeys.shift.isDown)
		{
			if(this.player.nitro > 1.5)
			{
				this.flameEmitter.start();
				this.player.nitro -= 1.5;
				if(this.player.currentSpeed < this.player.maxSpeed * 1.4)
				{
					this.player.currentSpeed += 15;
				}
			}
			else
			{
				this.flameEmitter.stop();
			}
		}
		else
		{
			this.flameEmitter.stop();
			if(this.player.nitro < this.player.nitroMax && this.player.currentSpeed > this.player.maxSpeed * 0.75)
			{
				this.player.nitro += 0.3;
			}
		}
		//Hamulec Reczny
	if (this.cursorKeys.space.isDown)
		{
			if(this.player.currentSpeed > 160)
			{
				this.emitter.start();
			}
			if(this.player.currentSpeed < 10 && this.player.currentSpeed > -10)
			{
				this.player.currentSpeed = 0;
				this.player.setVelocityY(0);
				this.player.setVelocityX(0);
			}
			else if (this.player.currentSpeed >= 10)
			{
				this.player.currentSpeed -= (this.player.brakesStrength * (1.4 * this.player.backwardsSpeed));
			}
			else
			{
				this.player.currentSpeed += (this.player.brakesStrength * (4 * this.player.backwardsSpeed));
			}
			if(this.cursorKeys.right.isDown)
			{
				this.player.setTexture("bluecarE");
			}
			else if(this.cursorKeys.left.isDown)
			{
				this.player.setTexture("bluecarW");
			}
		}
		//Antyhamulec
    else if (this.cursorKeys.up.isDown)
		{
			if(this.player.currentSpeed < (this.player.penalty * this.player.maxSpeed))
			{
				this.player.currentSpeed += this.player.penalty * this.player.acceleration;
			}
			this.player.setVelocityY(-this.player.currentSpeed * Math.cos(this.player.rotation));
			this.player.setVelocityX(this.player.currentSpeed * Math.sin(this.player.rotation));
			this.player.setTexture("player");
		}
		//Hamulec | Wsteczny
	else if (this.cursorKeys.down.isDown) 
		{
			if(this.player.currentSpeed > 0)
			{
				this.player.currentSpeed -= (this.player.brakesStrength * this.player.backwardsSpeed);
			}
			else if(this.player.currentSpeed > (-this.player.backwardsMaxSpeed))
			{
				this.player.currentSpeed -= (this.player.backwardsSpeed * this.player.brakesStrength);
			}
			this.player.setTexture("player");
		}
		//nic, powolne spowalnianie (siła tarcia xd)
	else 
		{ 
			if(this.player.currentSpeed >= 10)
			{
				this.player.currentSpeed -= 1;
			}
			else if(this.player.currentSpeed <= -10)
			{
				this.player.currentSpeed += 1;
			}
			else
			{
				this.player.currentSpeed = 0;
				this.player.setVelocityY(0);
				this.player.setVelocityX(0);
			}
			this.player.setTexture("player");
		}
		this.player.setVelocityY((-this.player.currentSpeed) * Math.cos(this.player.rotation));
		this.player.setVelocityX((this.player.currentSpeed) * Math.sin(this.player.rotation));
		if (this.player.currentSpeed < 0)
		{
			if(this.player.currentSpeed < (-this.player.penalty * this.player.backwardsMaxSpeed)-5)
			{
				this.player.currentSpeed += 8;
			}
		}
		else if(this.player.currentSpeed > (this.player.penalty * this.player.maxSpeed)+5)
		{
			if(this.player.currentSpeed > (this.player.penalty * this.player.maxSpeed))
			{
				this.player.currentSpeed -= 8;
			}
		}
		
		var tile = this.roadlayer.getTileAtWorldXY(this.player.x, this.player.y);
		if(tile == null)
		{
			this.player.penalty = 0.4;
		}
		else
		{
			this.player.penalty = 1;
		}
	}

	updateHUD(delta)
	{
		this.scoreLabel.text = "Speed: " + this.player.currentSpeed.toFixed(2);
		this.rotationLabel.text = "Time: " + (this.timeElapsed/1000).toFixed(2);
		this.fpsLabel.text = "Current FPS: " + (1000/delta).toFixed(2);
		this.locationLabel.text = "X pos: " + (this.player.x).toFixed(2) + "  Y pos: " + (this.player.y).toFixed(2);
		this.lapLabel.text = "Lap: " + this.lapCount;
		this.nitrometer.setScale(0.71, -6.4*(this.player.nitro / this.player.nitroMax));
	}
}

class Player extends Phaser.Physics.Arcade.Sprite
{
	constructor(scene, x, y, texture)
	{
		super(scene, x, y, texture);
		scene.add.existing(this);
		scene.physics.add.existing(this);
		
		this.maxSpeed = 240;
		this.backwardsMaxSpeed = 180;
		this.acceleration = 1.6;
		this.currentSpeed = 0;
		this.backwardsSpeed = 0.3;
		this.brakesStrength = 10;
		this.handling = 0.055;
		this.nitro = 0;
		this.nitroMax = 100;
	}
}

class Checkpoint extends Phaser.Physics.Arcade.Sprite
{
	constructor(scene, x, y, texture, isVertical, isFinish)
	{
		super(scene, x, y, texture);
		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.setImmovable(true);
		this.checked = false;
		this.isVertical = isVertical;
		this.isFinish = isFinish;
	}
}

class Routepoint extends Phaser.Physics.Arcade.Sprite
{
	constructor(scene, x, y, texture, isVisible)
	{
		super(scene, x, y, texture);
		scene.add.existing(this);
		scene.physics.add.existing(this)
		this.setImmovable(true);
		this.setVisible(isVisible);
	}
}

class enemyCar extends Phaser.Physics.Arcade.Sprite
{
	constructor(scene, x, y, texture, route)
	{
		super(scene, x, y, texture);
		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.maxSpeed = 230 + Math.floor(Math.random() * 15);
		this.acceleration = 1.5;
		this.currentSpeed = 0;
		this.handling = 0.06;
		this.penalty = 1;
		this.route = route;
		this.nextCheckpoint = route[0];//poprawić na 0 po update z chceckpointow na aiRoute
		this.pointNumber = 0;//same here
		this.lap = 0;
	}
	
	nextPoint()
	{
		if(this.pointNumber == this.route.length - 1)
		{
			this.pointNumber = 0;
			this.lap++;
		}
		else 
		{
			this.pointNumber++;
		}
		this.nextCheckpoint = this.route[this.pointNumber];
	}
	
	getRadiansToPoint()
	{
		var x = (this.nextCheckpoint.x - this.x);
		var y = (-this.nextCheckpoint.y + this.y);
		return Math.atan2(x, y);
	}
	
	isOnPoint()
	{
		if((this.x - this.nextCheckpoint.x > -40) && (this.x - this.nextCheckpoint.x < 10))
		{
			if(this.y - this.nextCheckpoint.y > -40 && this.y - this.nextCheckpoint.y < 10)
			{
				return true;
			}
		}
		return false;
	}
}