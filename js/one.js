pixel.one = function(game){

    //the world variables
   this.backgroundone = null;
   this.ground = null;
   this.ceiling = null;
   this.scrolltimer = 15000;
   this.increasex = 60;
   this.ceilingincreasex = -500;
   
   //the player variables
   this.theprotagonist = null;
   this.cursor;
   this.playerMinAngle = -20;
   this.playerMaxAngle = 20;
   this.playerAlive = true;
   this.enemycanhit = false;
   this.winscreen = false;

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
    this.restartthislevelbtn = null;
    this.restartTheGame = null;
    this.youwinPannelScreen = null;

    //enemy variables
    this.enemyRate = 1000;
    this.enemyTimer = 0;

    //audio
    this.jetSound = null;
    this.gameMusic = null;
    this.speedingup = null;
    this.iwon = null;
};

pixel.one.prototype = {

    create: function() {
        //build the world assetc
        this.buildWorldOne();

         //Set the games physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 600;


        //add the player
        this.theprotagonist = this.add.sprite(200, this.game.height/2, 'flyingPixel');
        this.theprotagonist.anchor.setTo(0.5);
        this.theprotagonist.scale.setTo(0.6);

        this.theprotagonist.animations.add('fly', [0,1]);
        this.theprotagonist.animations.play('fly', 8, true);

        this.game.physics.arcade.enableBody(this.theprotagonist);
        this.theprotagonist.body.collideWorldBounds = true;
        this.theprotagonist.body.bounce.set(0.25);

        //the pause button variable
        this.pauseButtonLevel = this.game.add.button(920, 45, 'pause', this.pauseGameLevel, this, 2, 1, 0);
        this.pauseButtonLevel.fixedToCamera = true;
        this.pauseButtonLevel.anchor.setTo(0.5, 0.5);
        this.pauseButtonLevel.scale.setTo(0.5);


        //add enemy assets
        this.enemies = this.game.add.group();

        //add player input
         this.cursor = this.input.keyboard.createCursorKeys();

         //add level audio
         this.jetSound = this.game.add.audio('rocket');
         this.gameMusic = this.game.add.audio('leveloneflingpixelmusic');
         this.gameMusic.play('', 0, 0.1, true);
         this.playerDeathSound = this.game.add.audio('playerDeath');
         this.iwon = this.game.add.audio('lel2');


         //trigger time event
         this.wintimer = this.game.time.create(false);
         this.wintimer.add(30000, this.Movetonextlevel, this);
         this.wintimer.start();
    },

Movetonextlevel: function(){
    if(this.playerAlive === true){
        this.winscreen = true;
        
        this.game.time.events.add(3000, this.level2, this);
    }
},

level2: function(){
    this.ResetTheGame();
    this.state.start('LevelOneStory');
},

    
buildWorldOne: function(){
    //add the scrolling background
        this.backgroundone =  this.game.add.tileSprite(0, 0, this.game.width, 640, 'oneBGScroll');
        
        //add the ground and ceiling
        this.ground = this.game.add.tileSprite(0, 590, this.game.width, 640, '23');
        this.game.physics.arcade.enableBody(this.ground);
        this.ground.body.allowGravity = false;
        this.ground.body.immovable = true;
        
        this.ceiling = this.game.add.tileSprite(0, 0, this.game.width, 60, '23');
        this.game.physics.arcade.enableBody(this.ceiling);
        this.ceiling.body.allowGravity = false;
        this.ceiling.body.immovable = true;

        //the pause button variable
        this.thePauseButton = this.game.add.button(920, 45, 'pause', this.pauseone, this, 1, 2,  0);
        this.thePauseButton.frame = 0;
        this.thePauseButton.anchor.setTo(0.5, 0.5);
        this.thePauseButton.scale.setTo(0.5);

},

createEnemy: function() {
    var x = this.game.width;
    var y = this.game.rnd.integerInRange(-350, 10);
    var bottomy = this.game.rnd.integerInRange(950, 950);
    

    var topenemy = this.enemies.getFirstExists(false);
    if(!topenemy) {
      topenemy = new Enemy(this.game, 0, 0);
      this.enemies.add(topenemy);
    }
    topenemy.reset(x, y);
    topenemy.revive();
  
    var bottomenemy = this.enemies.getFirstExists(false);
    if(!bottomenemy) {
      bottomenemy = new Enemy(this.game, 0, 1122);
      this.enemies.add(bottomenemy);
    }
    bottomenemy.reset(x, bottomy);
    bottomenemy.revive();
    
  },

enemyHit: function(player, topenemy) {

    if(this.enemycanhit === true){
    player.kill();
    this.playerAlive = false;
    //this.deathSound.play();
    //this.gameMusic.stop();
    this.backgroundone.stopScroll();
    this.ceiling.autoScroll(0, 0);
    this.ground.stopScroll();
    this.enemies.setAll('body.velocity.x', 0);
    this.YoulosethisGame();
    this.enemyTimer = Number.MAX_VALUE;}
},
    
    
 groundHit: function(player, ground) {

    if(this.enemycanhit === true){
    player.kill();
    this.playerAlive = false;
    //this.deathSound.play();
    //this.gameMusic.stop();
    this.backgroundone.stopScroll();
    this.ceiling.stopScroll();
    this.ground.stopScroll();
    this.enemies.setAll('body.velocity.x', 0);
    this.YoulosethisGame();
    this.enemyTimer = Number.MAX_VALUE;};
    },
    
 ceilingHit: function(player, ceiling) {

    if(this.enemycanhit === true){
    player.kill();
    this.playerAlive = false;
    //this.deathSound.play();
    //this.gameMusic.stop();
    this.backgroundone.stopScroll();
    this.ceiling.stopScroll();
    this.ground.stopScroll();
    this.enemies.setAll('body.velocity.x', 0);
    this.YoulosethisGame();
    this.enemyTimer = Number.MAX_VALUE;};
    },
    
/////////////   Game Over   ///////////////     
     YoulosethisGame: function(){

       this.gameMusic.stop();
        this.game.input.keyboard.removeKey(Phaser.Keyboard.UP);
        this.playerDeathSound.play('', 0, 1, false, false);
        this.playerDeathSound.volume = 0.1;
        this.jetSound.stop();

        this.loseScreen = this.add.sprite(0, 640, 'YouLoseLevel1');
        this.loseScreen.fixedToCamera = true;
        this.loseScreen.cameraOffset.setTo(0, 640);
        
        
        this.restartthislevelbtn = this.game.add.button(500, 1000, 'restart', function(){

            //restart the satae
            this.restarttheGame = true;

            this.ResetTheGame();
            this.world.setBounds(0, 0, 960, 640);
           
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

        if(this.isTheLevelPaused === true){
            this.wintimer.pause();
            this.backgroundone.autoScroll(0, 0);
            this.ground.autoScroll(0, 0);
            this.ceiling.autoScroll(0, 0);
            this.theprotagonist.body.velocity.y = 0;
            this.theprotagonist.body.allowGravity = false;
            this.game.input.keyboard.removeKey(Phaser.Keyboard.UP);
            this.enemycanhit = false;
            this.gameMusic.pause();
            this.enemies.setAll('body.velocity.x', 0);

        }
        else {
            this.wintimer.resume();
            this.backgroundone.autoScroll(this.increasex, 0);
            this.ground.autoScroll(this.ceilingincreasex, 0);
            this.ceiling.autoScroll(this.ceilingincreasex, 0);
            this.theprotagonist.body.allowGravity = true;
            this.cursor = this.input.keyboard.createCursorKeys();
            this.enemycanhit = false;
            this.gameMusic.resume();
        }
        if(this.winscreen === true) {
            this.enemycanhit = false;
            this.game.input.keyboard.removeKey(Phaser.Keyboard.UP);
            this.gameMusic.stop();
            this.iwon.play('', 0, 0.2, false, false);
            this.enemycanhit = false;
            this.theprotagonist.body.velocity.x += 20;
            this.theprotagonist.body.allowGravity = false;
            if (this.theprotagonist.body.velocity.y > 0) {this.theprotagonist.body.velocity.y = 0;};
            this.enemies.destroy();
            this.theprotagonist.body.collideWorldBounds = false;

        }
        if(this.playerAlive === false) {
            this.ceiling.autoScroll(0, 0);
            this.ground.autoScroll(0, 0);
            this.backgroundone.autoScroll(0, 0);
            this.game.input.keyboard.removeKey(Phaser.Keyboard.UP);
        }
            //player movment chacks
   
        if(this.cursor.up.isDown) {
          this.theprotagonist.body.velocity.y -= 25;
        if(this.cursor.up.justPressed) {
                      if(!this.jetSound.isPlaying) {
                this.jetSound.play('', 0, 0.3, false, false);
                }
        }else {
            this.jetSound.stop();}
            
        }

        if( this.theprotagonist.body.velocity.y < 0 || this.cursor.up.isDown) {
          if(this.theprotagonist.angle > 0) {
            this.theprotagonist.angle = 0;
          }

            if(this.theprotagonist.angle > this.playerMinAngle) {
                this.theprotagonist.angle -= 0.5;
              }
        } else if(this.theprotagonist.body.velocity.y >=0 && !this.cursor.up.isDown) {
          if(this.theprotagonist.angle < this.playerMaxAngle) {
            this.theprotagonist.angle += 0.5;

                }
            }


            if(this.isTheLevelPaused === false) {if(this.enemyTimer < this.game.time.now) {
          this.createEnemy();
          this.enemyTimer = this.game.time.now + this.enemyRate;
        }}

            if(this.wintimer.duration < this.scrolltimer) {
          this.increasex++;
          this.ceilingincreasex--;
        }
        
//////////////////////  Enemy Hit   //////////////////////////////

        this.game.physics.arcade.overlap(this.theprotagonist, this.enemies, this.enemyHit, null, this);
        
 //////////////////////  Ground Hit //////////////////////////////

        this.game.physics.arcade.collide(this.theprotagonist, this.ground, this.groundHit, null, this);
        this.game.physics.arcade.collide(this.theprotagonist, this.ceiling, this.ceilingHit, null, this);

//////////////////////  Restart //////////////////////////////

         if(this.restarttheGame === true){


                this.restarttheGame = false;
            }
    },
    
    ResetTheGame: function(){

        //the pause elements trigger
        this.isTheLevelPaused = false;
        this.TweenPauseElement = null;
        this.world.setBounds(0, 0, 960, 640);

        //the world variables
        this.backgroundone = null;
        this.ceiling = null;
        this.ground = null;
        this.scrollTimer = 1;
        this.increasex = 60;

        //the player variables
        this.theprotagonist = null;
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
        this.iwon = null;

        //screen elements
        this.loseScreen = null;
        this.bacttothemainscreenBtn = null;
        this.restartthislevelbtn = null;

        //the pause button 
        this.pauseButtonLevel = null;
        this.pauseScreen = null;
        this.continuelevelbtn = null;
        this.returntomainbtn = null;

    },

//////////////////////  Pause   //////////////////////////////

  pauseGameLevel: function(pointer){

        if(this.isTheLevelPaused === false){

            this.isTheLevelPaused = true;
            this.showPausePannel();

            //Pause the enemy
            this.game.time.pause();
            this.enemycanhit = false;
            
            //pause teh player
            this.game.physics.arcade.gravity.y = 0;
            this.theprotagonist.body.velocity.y = 0;
            this.theprotagonist.body.velocity.x = 0;
            this.theprotagonist.animations.stop();

          
        }

    },

    PlayGame: function(){

        this.hidethepausePaneel();
        this.enimie.callAll('animations.play', 'animations', 'left-enimie');

        this.game.physics.arcade.gravity.y = 400;

        this.gameMusic.play('', 0, true);
        this.gameMusic.volume = 0.35;
    },

    showPausePannel: function(){

        this.pauseScreen = this.add.sprite(1000, 0, 'pauseScreen');
        this.pauseScreen.fixedToCamera = true;
        this.pauseScreen.cameraOffset.setTo(1000, 0);
        
        this.continuelevelbtn =  this.game.add.button(1000, 385, 'continue', function(){
            
            this.isTheLevelPaused = false;
            this.PlayGame();

        }, this,2,0,1);
        this.continuelevelbtn.fixedToCamera = true;
        this.continuelevelbtn.scale.setTo(0.6);
        this.continuelevelbtn.cameraOffset.setTo(1000, 385);

        this.returntomainbtn = this.game.add.button(1000, 450, 'back', function(){
            this.ResetTheGame();
            this.game.state.start('MainMenu');
            
        }, this,2,0,1 );
        this.returntomainbtn.fixedToCamera = true;
        this.returntomainbtn.scale.setTo(0.6);
        this.returntomainbtn.cameraOffset.setTo(1000, 450);


        //add the tween
        this.game.add.tween(this.pauseScreen.cameraOffset).to({x: 447}, 1000, Phaser.Easing.Bounce.Out, true);
        this.game.add.tween(this.continuelevelbtn.cameraOffset).to({x: 690}, 1000, Phaser.Easing.Bounce.Out, true);
        this.game.add.tween(this.returntomainbtn.cameraOffset).to({x: 690}, 1000, Phaser.Easing.Bounce.Out, true);
    },

    hidethepausePaneel: function(){

        this.game.add.tween(this.pauseScreen.cameraOffset).to({x: 1000}, 500, Phaser.Easing.Linear.NONE, true);
        this.game.add.tween(this.continuelevelbtn.cameraOffset).to({x: 1000}, 500, Phaser.Easing.Linear.NONE, true);
        this.game.add.tween(this.returntomainbtn.cameraOffset).to({x: 1000}, 500, Phaser.Easing.Linear.NONE, true);


    },
    
    render: function (){
        
            this.game.debug.text('Time until event: ' + this.wintimer.duration.toFixed(0), 32, 32);
    }
    
    };