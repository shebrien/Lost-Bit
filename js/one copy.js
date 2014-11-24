pixel.one = function(game){

    //the world variables
   this.backgroundone = null;

   //the player variables
   this.theprotaginest = null;
   this.cursor;
   this.playerMinAngle = -20;
   this.playerMaxAngle = 20;
   this.playerAlive = true;
   this.enemycanhit = true;

    //the pause button 
    this.pauseButtonLevel = null;
    this.pauseScreen = null;
    this.continuelevelbtn = null;
    this.returntomainbtn = null;

    //the pause elements trigger
    this.isTheLevelPaused = false;
    this.TweenPauseElement = null;

    //the Gameover pannel
    this.GameOverPannel = null;
    this.backtomenugameoverbutton = null;
    this.restartTheGame = null;
    this.youwinPannelScreen = null;

    //enemy variables
    this.enemyRate = 500;
    this.enemyTimer = 0;

    //audio
    this.jetSound = null;
    this.gameMusic = null;
    this.iwon = null
}

pixel.one.prototype = {

    create: function() {

        
        //build the world assetc
        this.buildWorldOne();

         //Set the games physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 400;


        //add the player
        this.theprotaginest = this.add.sprite(200, this.game.height/2, 'flyingPixel');
        this.theprotaginest.anchor.setTo(0.5);
        this.theprotaginest.scale.setTo(0.6);

        this.theprotaginest.animations.add('fly', [0,1]);
        this.theprotaginest.animations.play('fly', 8, true);

        this.game.physics.arcade.enableBody(this.theprotaginest);
        this.theprotaginest.body.collideWorldBounds = true;
        this.theprotaginest.body.bounce.set(0.25);

        //add enemy assets
        this.enemies = this.game.add.group();

        //add player input
         this.cursor = this.input.keyboard.createCursorKeys();

         //add level audio
         this.jetSound = this.game.add.audio('rocket');
         this.gameMusic = this.game.add.audio('leveloneflingpixelmusic');
         this.gameMusic.play('', 0, true);
         this.gameMusic.volume = 0.2;
         this.playerDeathSound = this.game.add.audio('playerDeath');
         this.iwon = this.game.add.audio('getUSB');


         //trigger time event
         this.game.time.events.add(30000, this.Movetonextlevel, this);
        
    },

Movetonextlevel: function(){
    if(this.playerAlive === true){
    	this.gameMusic.stop();
    	this.iwon.play('', 0, 1, false, false);
        this.enemycanhit = false;
        this.theprotaginest.body.velocity.x += 200;
        this.theprotaginest.body.allowGravity = false;
        this.theprotaginest.y = this.game.height/2;
        this.enemies.destroy();
        this.resettheonevariables();
        this.game.time.events.add(9000, this.level2, this);
        	this.level2();
       
    }
},

level2: function(){
    this.state.start('LevelOneStory');
},

    
buildWorldOne: function(){
    //add the scrolling background
        this.backgroundone =  this.game.add.tileSprite(0, 0, this.game.width, 640, 'oneBGScroll');
        this.backgroundone.autoScroll(-120, 0);
        

        //the pause button variable
        this.thePauseButton = this.game.add.button(920, 45, 'pause', this.pauseone, this, 1, 2,  0);
        this.thePauseButton.frame = 0;
        this.thePauseButton.anchor.setTo(0.5, 0.5);
        this.thePauseButton.scale.setTo(0.5);

},





resettheonevariables: function(){

    //the world variables
   this.backgroundone = null;

  //the player variables
   this.theprotaginest = null;
   this.cursor;
   this.playerMinAngle = -20;
   this.playerMaxAngle = 20;
   this.playerAlive = true;
   this.enemycanhit = true;

   //pause Button
    this.thePauseButton = null;
    this.thePausePannel = null;
    this.thecontinuebossbutton = null;
    this.TheMainMenuBossButton = null;

    //the pasue trigger
    this.isPaused = false;
    this.TweenPause = null;

    //the Gameover pannel
    this.GameOverPannel = null;
    this.backtomenugameoverbutton = null;
    this.restartTheGame = null;
    this.youwinPannelScreen = null;

    //enemy variables
    this.enemyRate = 500;
    this.enemyTimer = 0;

    this.enemyTimer = 0;
    this.playerEnergyTimer = 0;

    //audio
    this.jetSound = null ;
    this.gameMusic = null;

},

createEnemy: function() {
    var x = this.game.width;
    var y = this.game.rnd.integerInRange(50, this.game.world.height);

    var enemy = this.enemies.getFirstExists(false);
    if(!enemy) {
      enemy = new Enemy(this.game, 0, 0);
      this.enemies.add(enemy);
    }
    enemy.reset(x, y);
    enemy.revive();
  },

enemyHit: function(player, enemy) {

    if(this.enemycanhit === true){
    player.kill();
    enemy.kill();
    this.playerAlive = false;
    //this.deathSound.play();
    //this.gameMusic.stop();
    this.backgroundone.stopScroll();
    this.enemies.setAll('body.velocity.x', 0);

    this.enemyTimer = Number.MAX_VALUE;};
    
/////////////	Game Over	///////////////     
 
       this.gameMusic.stop();

        this.playerDeathSound.play('', 0, 1, false, false);
        this.playerDeathSound.volume = 0.4;

        this.loseScreen = this.add.sprite(0, 640, 'YouLoseLevel1');
        this.loseScreen.fixedToCamera = true;
        this.loseScreen.cameraOffset.setTo(0, 640);
        
        
        this.restartthislevelbtn = this.game.add.button(500, 1000, 'restart', function(){

            //restart the satae
            this.restarttheGame = true;

            this.ResetTheGame();
            this.world.setBounds(0, 0, 6784, 1000);
           
            this.game.state.start('one');

        }, this, 2,1,0 );
        this.restartthislevelbtn.fixedToCamera = true;
        this.restartthislevelbtn.scale.setTo(0.5);
        this.restartthislevelbtn.cameraOffset.setTo(500, 640);

        this.bacttothemainscreenBtn = this.game.add.button(420, 1000, 'backtoMainTheMenu', function(){

            this.ResetTheGame();
            this.game.state.start('MainMenu');

        }, this,2,1,0 );
        this.bacttothemainscreenBtn.fixedToCamera = true;
        this.bacttothemainscreenBtn.scale.setTo(0.5);
        this.bacttothemainscreenBtn.cameraOffset.setTo(420, 640);

        //add their tween 
        this.game.add.tween(this.loseScreen.cameraOffset).to({y:0}, 500, Phaser.Easing.Bounce.Out, true);
        this.game.add.tween(this.restartthislevelbtn.cameraOffset).to({y:400}, 1000, Phaser.Easing.Bounce.Out, true);
        this.game.add.tween(this.bacttothemainscreenBtn.cameraOffset).to({y:400}, 1000, Phaser.Easing.Bounce.Out, true);
  },


update: function(){


            //player movment chacks
   
        if(this.cursor.up.isDown) {
          this.theprotaginest.body.velocity.y -= 25;
          if(!this.jetSound.isPlaying) {
                this.jetSound.play('', 0, true, 0.5);
                this.jetSound.volume = 0.3;}
        }else {
            this.jetSound.stop();}

        if( this.theprotaginest.body.velocity.y < 0 || this.cursor.up.isDown) {
          if(this.theprotaginest.angle > 0) {
            this.theprotaginest.angle = 0;
          }

            if(this.theprotaginest.angle > this.playerMinAngle) {
                this.theprotaginest.angle -= 0.5;
              }
        } else if(this.theprotaginest.body.velocity.y >=0 && !this.cursor.up.isDown) {
          if(this.theprotaginest.angle < this.playerMaxAngle) {
            this.theprotaginest.angle += 0.5;

                }
            }


            if(this.enemyTimer < this.game.time.now) {
          this.createEnemy();
          this.enemyTimer = this.game.time.now + this.enemyRate;
        }

//////////////////////	Enemy Hit	//////////////////////////////

        this.game.physics.arcade.overlap(this.theprotaginest, this.enemies, this.enemyHit, null, this);
        
//////////////////////	Restart	//////////////////////////////

         if(this.restarttheGame === true){

                if(this.player.x > 50){
                this.player.x = 50;
                }
                this.restarttheGame = false;
            }
    },
    
    ResetTheGame: function(){

        //the pause elements trigger
        this.isTheLevelPaused = false;
        this.TweenPauseElement = null
        this.world.setBounds(0, 0, 960, 640);

        this.circleTween = null;
        this.SharpVerticalTween = null;
        this.SharpHorozontalTween = null;
        this.shortSharpHorozontal = null;
        this.smallSmoothVerticalTween = null;


        //bossworld build
        this.TheBackgroundLevelOne = null;

        this.platformLevelOne = null;
        this.circleGroup = null;
        this.VerticalSharpHorizontalGroup = null;
        this.shortSharpHorizontalPillar = null;
        this.shortsharpHorizontalTwo = null;
        this.SmallSmoothVerticalPillarGroup = null;

        //player variables
        this.MovmentPlayer = null;
        this.canPlayerMove = true;
        this.player = null;
        this.jumpButton = null;

        //glitch Varables
        this.glitcCount = false;
        this.screenGlitchEffect = null;
        this.glitchButton = null;
        this.counterMove = true;

        //enemy reset variables
        this.enemyTween = null;
        this.flyingTween = null;
        this.enimie = null;
        this.flyingEnimie = null;
        this.enemyGhost = null;

        //screen elements
        this.loseScreen = null;
        this.bacttothemainscreenBtn = null;
        this.restartthislevelbtn = null;

        //usb key variables
        this.getflash = null;
        this.usb = null;
        this.getUSB = false;

        //exit door
        this.exit = null;

        //the button speech
        this.buttonSpeech = null;
        this.instructionbox = null;
        this.instructiobbuble = null;

        //the pause button 
        this.pauseButtonLevel = null;
        this.pauseScreen = null;
        this.continuelevelbtn = null;
        this.returntomainbtn = null;

        //Game Time Elements
        this.timeboard = null;
        this.timeText = null;
        this.fontStyle = {font: "14px Arial", fill: "#fff", stroke: "#575957", strokeThickness: 3, align: "center"};
        this.gametime = 220;
        outofTime = false;

        
        //audio variables
        this.gameMusic = null;
        this.jumpSound = null;
        this.select = null;
        this.enimyKill = null;
        this.level2 = null;
        this.noGo = null;
        this.getUSBsound = null;
        this.glitchSound = null;
        this.playerDeathSound = null;
        this.enemyGhost = null;
        this.jetSound = null;
    },
};
