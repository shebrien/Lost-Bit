pixel.Levelone = function(game){

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
    this.TheEnemies = null;

    //game status
    this.didwinlevel = false;

    //this level USB
    this.LeveloneUSB = null;

    //time variables
    this.theLevelTime = 60;
    this.Thetimeboard = null;
    this.ThetimeText = null;
    this.ThefontStyle = {font: "14px Arial", fill: "#fff", stroke: "#575957", strokeThickness: 3, align: "center"};
    this.timefinished = false;

    //player health
    this.protagenisthealth = 4;
    this.theemptyHeart = null;
    this.theFullhealth = null;
    this.thecountHealth = 3;

    //instruction variables
    this.levelOneInstructions = null;
    this.closelvl1btn = null;


    //audio
    this.jetSound = null;
    this.gameMusic = null;
    this.iwon = null
    this.theplayerHitSound = null;
    this.playcount = 1;
}

pixel.Levelone.prototype = {

    create: function() {

        this.protagenisthealth = 4;
        this.thecountHealth = 3;
        //build the world assetc
        this.buildWorldOne();



         //Set the games physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 400;



        //add the player
        this.theprotaginest = this.add.sprite(240, this.game.height/2, 'flyingPixel');
        this.theprotaginest.anchor.setTo(0.5);
        this.theprotaginest.scale.setTo(0.6);

        this.theprotaginest.animations.add('fly', [0,1]);
        this.theprotaginest.animations.play('fly', 8, true);

        this.game.physics.enable(this.theprotaginest, Phaser.Physics.ARCADE);
        //this.game.physics.arcade.enableBody(this.theprotaginest);
        this.theprotaginest.body.collideWorldBounds = true;
        this.theprotaginest.body.bounce.set(0.25);


        //the pause button variable
        this.thePauseButton = this.game.add.button(920, 45, 'pause', this.pauseone, this, 1, 2,  0);
        this.thePauseButton.frame = 0;
        this.thePauseButton.anchor.setTo(0.5, 0.5);
        this.thePauseButton.scale.setTo(0.5);


        //add player input
         this.cursor = this.input.keyboard.createCursorKeys();


        //usb variable
        this.LeveloneUSB = this.add.sprite(800, this.game.height/2, 'OneUsb');
        this.game.physics.arcade.enable(this.LeveloneUSB);
        this.LeveloneUSB.anchor.setTo(0.5, 0.5);
        this.LeveloneUSB.scale.setTo(0.3);
        this.LeveloneUSB.body.gravity = false;
        this.LeveloneUSB.alpha = 0;

        //add level audio
         this.jetSound = this.game.add.audio('rocket');
         this.theplayerHitSound = this.game.add.audio('PlayerHitByBossAudio');
         this.gameMusic = this.game.add.audio('leveloneflingpixelmusic',0, true);
         this.gameMusic.play('', 0, true);
         this.gameMusic.volume = 0.25;
         this.playerDeathSound = this.game.add.audio('playerDeath');
         this.iwon = this.game.add.audio('getUSB');
         this.iwon.loop = false;

        this.enemycanhit = false;
        //view game instructions
        this.game.time.events.add(500, this.levelOneGameInstruction, this);

         //adding time feature in game
        this.game.time.events.loop(Phaser.Timer.SECOND, this.updateLevelTimer, this);
        
    },

levelOneGameInstruction: function(){

   //add worrior instructions
    this.levelOneInstructions = this.game.add.sprite(80, 50, 'levelOneInstructions');
    this.closelvl1btn = this.game.add.button(110, 80, 'close', this.startLevelOneGame, this, 2, 1, 0);
    this.closelvl1btn.anchor.setTo(0.5, 0.5);
    this.closelvl1btn.scale.setTo(0.5);
    this.isTheLevelPaused = true;
},

startLevelOneGame: function(){

   this.enemycanhit = true;
   this.levelOneInstructions.kill();
   this.closelvl1btn.kill();
   this.isTheLevelPaused = false;

},


updateLevelTimer:function(){

  if(this.isTheLevelPaused === false)

    if(this.theLevelTime > 0){

        this.theLevelTime -= 1;
        playerScore+=1;
        this.ThetimeText.text = this.theLevelTime;
     }

    if(this.theLevelTime === 0){
      this.LeveloneUSB.y = this.theprotaginest.y;
      this.LeveloneUSB.alpha = 1;
      this.ThetimeText.text = 0;
      this.timefinished = true;
      this.didwinlevel = true;
      this.enemycanhit = false;
      this.TheEnemies.destroy();

      this.gameMusic.stop();

      if(this.playcount === 1){
         this.iwon.play();
       }
      this.playcount ++;

      this.theprotaginest.body.velocity.x = 250;
      this.theprotaginest.body.allowGravity = false;
      this.theprotaginest.body.collideWorldBounds = false;

              
      this.game.add.tween(this.theprotaginest).from( { y: this.theprotaginest.y }, 2000, Phaser.Easing.Bounce.Out, true);

      this.game.time.events.add(2800, this.Movetonextlevel, this);
              
      }

},

Movetonextlevel: function(){

    if(this.playerAlive === true){
        this.didwinlevel = true;
        this.ResetTheGame();
        console.log("score "+playerScore);
        this.level2();
    }
},

level2: function(){

    this.ResetTheGame();
    this.state.start('LevelOneStory');
},

    
buildWorldOne: function(){
    //add the scrolling background
        this.backgroundone =  this.game.add.tileSprite(0, 0, this.game.width, 640, 'oneBGScroll');
        this.backgroundone.autoScroll(-120, 0);
        

        //add enemy assets
        this.TheEnemies = this.game.add.group();


        //create score board that follows camera
        this.Thetimeboard = this.add.sprite( 100 , 50, 'timeBoard');
        this.Thetimeboard.anchor.setTo(0.5, 0.5);
        this.Thetimeboard.scale.setTo(0.6);

        //add time text
        this.ThetimeText = this.add.text(95, 40, this.theLevelTime, this.ThefontStyle);

        
        //player health varables
        var z = 0
        var w = 0
        this.theemptyHeart = this.game.add.group();
        for (var i =0; i < 4; i++){

            var heart = this.add.sprite(200 + z,  40 , 'emptyHeart',0, this.theemptyHeart);
            heart.scale.setTo(0.4);
            z += 30;
        }

        this.theFullhealth = this.game.add.group();
        for (var i =0; i < 4; i++){

            var heart = this.add.sprite(200 + w,  40 , 'fullHeart',0, this.theFullhealth);
            heart.scale.setTo(0.4);
            w += 30;
        }

        

},



createEnemy: function() {
    var x = this.game.width;
    var y = this.game.rnd.integerInRange(50, this.game.world.height);

    var enemy = this.TheEnemies.getFirstExists(false);
    if(!enemy) {
      enemy = new Enemy(this.game, 0, 0);
      this.TheEnemies.add(enemy);
    }
    enemy.reset(x, y);
    enemy.revive();
  },

enemyHit: function(player, enemy) {

  if(this.enemycanhit === true){
    this.protagenisthealth--;
    enemy.kill();

    if(this.protagenisthealth <= 0){
      
      this.theprotaginest.kill();
      this.playerAlive = false;
      this.backgroundone.stopScroll();
      this.TheEnemies.setAll('body.velocity.x', 0);

      this.enemyTimer = Number.MAX_VALUE;
      this.EndlevelOne();
    }

    if(this.protagenisthealth > 0){
                
      this.theplayerHitSound.play();
      this.theplayerHitSound.volume = 0.2;
      this.theFullhealth.getAt(this.thecountHealth).alpha = 0;
      this.thecountHealth --;
                
      }
    }
  },
    
///////////// Game Over /////////////// 

 EndlevelOne:function(){

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
           
            this.game.state.start('Levelone');

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


  ResetTheGame: function(){

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

    //game status
    this.didwinlevel = false;

    //time variables
    this.theLevelTime = 60;
    this.Thetimeboard = null;
    this.ThetimeText = null;
    this.ThefontStyle = {font: "14px Arial", fill: "#fff", stroke: "#575957", strokeThickness: 3, align: "center"};
    this.timefinished = false;

    //audio
    this.jetSound = null;
    this.gameMusic = null;
    this.iwon = null;
    this.protagenisthealth=4;
    this.thecountHealth=3;

    },

//////////////////////  Pause //////////////////////////////

pauseone: function(pointer){

  if(this.isTheLevelPaused === false){
    this.isTheLevelPaused = true;
    this.gameMusic.stop();

    //Pause the enemy
    this.TheEnemies.callAll('animations.stop', 'animations');
    this.TheEnemies.setAll('body.velocity.x', 0);;
    this.enemycanhit = false;
    this.showPausePannel();

    //pause the player
    this.game.physics.arcade.gravity.y = 0;
    this.theprotagonist.body.allowGravity = false;
    this.theprotagonist.body.gravity.y =  0;
    this.theprotagonist.body.velocity.y = 0;
    this.theprotagonist.body.velocity.x = 0;
    this.theprotagonist.body.gravity.x = 0;
    this.theprotaginest.animations.stop();

    

     
    }

  },



playerGetUSB: function(){

  this.LeveloneUSB.kill();
},


PlayGame: function(){

        this.hidethepausePaneel();
        this.game.physics.arcade.gravity.y = 400;

        //play enemy 
        this.TheEnemies.callAll('animations.play', 'animations', 'fly');
        this.TheEnemies.setAll('body.velocity.x', -400);
        this.enemycanhit = true;

        //play player
        this.theprotaginest.animations.play('fly');


        //play music  
        this.gameMusic.play('', 0, true);
        this.gameMusic.volume = 0.2;
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
    

update: function(){


        //player movment chacks
        if (this.isTheLevelPaused === false){
           
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
        } 

        else if(this.isTheLevelPaused === true){
          this.theprotaginest.body.velocity.y = 0;
        }


      if(this.isTheLevelPaused === false) {if(this.enemyTimer < this.game.time.now) {
          this.createEnemy();
          this.enemyTimer = this.game.time.now + this.enemyRate;
        }}

   //////////////////////  Enemy Hit //////////////////////////////

        this.game.physics.arcade.overlap(this.theprotaginest, this.TheEnemies, this.enemyHit, null, this);
        this.game.physics.arcade.overlap(this.theprotaginest, this.LeveloneUSB, this.playerGetUSB, null, this);
        
    //////////////////////  Restart //////////////////////////////

         if(this.restarttheGame === true){

               
                this.restarttheGame = false;
            }
    }

    
    
};
