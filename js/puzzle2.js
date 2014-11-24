pixel.puzzle = function(game){
	this.puzzleBG = null;

	//time variables
	this.timeboardPuzzle = null;
	this.puzzleTextStyle = {font: "14px Arial", fill: "#fff", stroke: "#575957", strokeThickness: 3, align: "center"};
	this.PuzzleTimeText = null;
	this.puzzleTime = 60;
	this.inThetimeState = false;
	this.timePuzzleisup = false;


	//game pause level
	this.isThePuzzlePaused = false;
	this.puzzlePausebtn = null;

    //player elements
    this.theHero = null;
    this.HeroMovment = null;
    this.playerMove = true;

	//pixel blocks elements
	this.pixelBlocks = null;
	this.pixelBlocks2 = null;
	this.pixelBlocks3 = null;
	this.pixelBlocks4 = null;
	this.pixelBlocks5 = null;

    //button elements
    this.movingBricks = null;
    this.movingBricks2 = null;
    this.movingBricks3 = null;
    this.movingBricks4 = null;
    this.moveOne = null;
    this.moveTwo = null;
    this.moveThree = null;
    this.moveFour = null;
    this.greenG = null;
    this.blackG = null;
    this.lightGreen = null;
    this.darkGreen = null;
    this.stopBrickes = false;

    //the switch elements
    this.theswitch = null;
    this.switchCount = false;
    this.screenGlitchEffect = null;
    this.stares = null;
    this.staresVisable = false;
    this.inGlitch = false;
    this.outofGlitch = true;

    //wining game
    this.counter = 0;
    this.blackCounter = 0;
    this.GreenCounter = 0;
    this.DarkGreenCounter = 0;
    this.finalGreenCount = 0;


    //instructions element
    this.prelevelOneInstructions = null;
    this.precloselvl1btn = null;

    //fininshing the level elements
    this.thejetUSB = null;
    this.thejetIcon = null;
    this.thejetPlayer = null;
    this.blockJetIcon = null;
    this.didgetusb = false;

    //player health
    this.emptyHeart = null;
    this.fullHeart = null;

	//audio elements
	this.ThePuzzleGameOverMusic = null;
    this.thejumpSound = null;
    this.theswitchSound = null;
    this.theglitchSound = null;
    this.mainGameMusic = null;
    this.fallingPixelsSound = null;
    this.getRedUSBsound = null;
    this.MoveToNextLevelSound = null;

    //level score
    this.lvlScore;
    this.levelScoreText;
};

pixel.puzzle.prototype = {
        

create: function(){
    
        // Clay.ready( function() {
        //     pixel.leaderboard = new Clay.Leaderboard( { id: 4818 } );
        // } );
        //set the game physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 400;

		//add background
		this.puzzleBG = this.add.sprite(0, 0, 'oneBGScroll');

		//add time board variables
		this.timeboardPuzzle = this.add.sprite( 100 , 50, 'timeBoard');
        this.timeboardPuzzle.anchor.setTo(0.5, 0.5);
        this.timeboardPuzzle.scale.setTo(0.7);

        //add time text 
        this.PuzzleTimeText = this.add.text(95, 40, this.puzzleTime, this.puzzleTextStyle);
        this.levelScoreText = this.add.text(95, 40, "", this.puzzleTextStyle);
        //add the pause elements
        this.puzzlePausebtn = this.game.add.button(920, 45, 'pause', this.pausePuzzleGame, this, 2, 1, 0);
        this.puzzlePausebtn.frame = 0;
        this.puzzlePausebtn.anchor.setTo(0.5, 0.5);
        this.puzzlePausebtn.scale.setTo(0.5);

        //adding the blocking pixels
        this.addBlockPixels();
        this.addMovingBricks();

        //add the switch
        this.theswitch = this.add.sprite(410, 625, 'theSwitch');
        this.game.physics.arcade.enable(this.theswitch);
        this.theswitch.anchor.setTo(0.5, 0.5);
        this.theswitch.scale.setTo(0.4);
        this.theswitch.body.gravity = false;


        //adding the stares
        this.stares = this.game.add.group();
        this.stares.enableBody = true;
        this.stares.physicsBodyType = Phaser.Physics.ARCADE;

        for(var i = 0; i < 8; i++){
            var stare = this.stares.create(320 - 30 * i, 620 - 30 * i, 'Particle');
            stare.body.allowGravity = false;
        }
        this.stares.setAll('body.immovable', true);
        this.stares.alpha = 0;


        //adding usb
        this.thejetUSB = this.add.sprite(800, 630, 'redUsb');
        this.thejetUSB.anchor.setTo(0.5, 0.5);
        this.thejetUSB.scale.setTo(0.3);
        this.game.physics.arcade.enable(this.thejetUSB);
        this.thejetUSB.body.gravity = false;
        this.thejetUSB.alpha = 0;


        //player elements
        this.theHero = this.add.sprite( 50, this.world.height , 'player2');
        this.game.physics.arcade.enable(this.theHero);
        this.theHero.frame = 3;
        this.theHero.enableBody = true;
        this.theHero.body.bounce.y = 0.2;
        this.theHero.body.gravity.y = 300;
        this.theHero.body.collideWorldBounds = true;
        this.theHero.allowGravity = true;
        this.theHero.anchor.setTo(0.5, 0.5);
        this.theHero.scale.setTo(0.4);

        this.theHero.animations.add('left', [0,1,2], 10, true);
        this.theHero.animations.add('right', [4,5,6], 10, true);


        //adding life bars
        var z = 0;
        var w = 0;
        this.emptyHeart = this.game.add.group();
        for (var i =0; i <4; i++){

            var heart = this.add.sprite(200 + z,  40 , 'emptyHeart',0, this.emptyHeart);
            heart.scale.setTo(0.4);
            z += 30;
        }
        this.emptyHeart.fixedToCamera = true;

        this.fullHeart = this.game.add.group();
        for (var i =0; i <4; i++){

            var heart = this.add.sprite(200 + w,  40 , 'fullHeart',0, this.fullHeart);
            heart.scale.setTo(0.4);
            w += 30;
        }        
            
        //add audio elements
		this.ThePuzzleGameOverMusic = this.game.add.audio('playerDeath');
        this.thejumpSound = this.game.add.audio('jump');
        this.theswitchSound = this.game.add.audio('select');
        this.theglitchSound = this.game.add.audio('glitchSound');
        this.fallingPixelsSound = this.game.add.audio('fallingPixelsSound');
        this.mainGameMusic =  this.game.add.audio('preOneMusic',0, true);
        this.getRedUSBsound = this.game.add.audio('getUSB');
        this.MoveToNextLevelSound = this.game.add.audio('lel2');
        this.mainGameMusic.play('', 0, true);
        this.mainGameMusic.volume = 0.2;


        //add player movment
        this.HeroMovment = this.game.input.keyboard.createCursorKeys();

        this.playerMove = false;
        //view game instructions
        this.game.time.events.add(500, this.preLevelOneInstructions, this);

        //adding time feature in game
        this.game.time.events.loop(Phaser.Timer.SECOND, this.updatePuzzleTimer, this);

	},


    preLevelOneInstructions: function(){

        //add worrior instructions
        this.prelevelOneInstructions = this.game.add.sprite(80, 50, 'prelevelOneInstructions');
        this.precloselvl1btn = this.game.add.button(110, 80, 'close', this.startPuzzleLevelOneGame, this, 2, 1, 0);
        this.precloselvl1btn.anchor.setTo(0.5, 0.5);
        this.precloselvl1btn.scale.setTo(0.5);
        this.isThePuzzlePaused = true;
    },

    startPuzzleLevelOneGame: function(){

        this.prelevelOneInstructions.kill();
        this.precloselvl1btn.kill();
        this.playerMove = true;
        this.isThePuzzlePaused = false;
    },

	updatePuzzleTimer: function(){

		if(this.isThePuzzlePaused === false){

			if(this.puzzleTime > 0){
			this.puzzleTime --;
                        playerScore+=1;
			this.PuzzleTimeText.text = this.puzzleTime;
			}
		

			if( this.puzzleTime <= 0 && this.inThetimeState === false){
	            this.timePuzzleisup = true;
	                        
	        }

	        if(this.timePuzzleisup === true){
	            this.timePuzzleisup = false;
	            this.inThetimeState = true;
	            this.YouLose();
	        }
        }

	},


	addBlockPixels: function(){

		//add the group of pixel bloacks
        this.pixelBlocks = this.game.add.group();
        this.pixelBlocks.enableBody = true;
        this.pixelBlocks.physicsBodyType = Phaser.Physics.ARCADE;
        for(var i =0; i <15; i++){
        	var pixelBlock = this.pixelBlocks.create (500 + 25 * i, 100 , 'Particle', i);
             pixelBlock.body.allowGravity = false;
        }
         for(var i =0; i <15; i++){
        	var pixelBlock = this.pixelBlocks.create (580 + 25 * i, 370 , 'Particle', i + 15);
             pixelBlock.body.allowGravity = false;
        }

         for(var i =0; i <15; i++){
        	var pixelBlock = this.pixelBlocks.create (580 + 25 * i, 400 , 'Particle', i + 30);
             pixelBlock.body.allowGravity = false;
        }
        for(var i =0; i <15; i++){
        	var pixelBlock = this.pixelBlocks.create (500 + 25 * i, 620 , 'Particle', i + 45);
             pixelBlock.body.allowGravity = false;
        }
        this.pixelBlocks.setAll('body.immovable', true);


        this.pixelBlocks2 = this.game.add.group();
        this.pixelBlocks2.enableBody = true;
        this.pixelBlocks2.physicsBodyType = Phaser.Physics.ARCADE;
         for(var i =0; i <15; i++){
        	var pixelBlock = this.pixelBlocks2.create (500 + 25 * i, 70 , 'Particle2', i);
             pixelBlock.body.allowGravity = false;
        }

         for(var i =0; i <15; i++){
        	var pixelBlock = this.pixelBlocks2.create (500 + 25 * i, 130 , 'Particle2', i + 15);
             pixelBlock.body.allowGravity = false;
        }

         for(var i =0; i <15; i++){
        	var pixelBlock = this.pixelBlocks2.create (500 + 25 * i, 160 , 'Particle2', i + 30);
             pixelBlock.body.allowGravity = false;
        }

         for(var i =0; i <15; i++){
        	var pixelBlock = this.pixelBlocks2.create (580 + 25 * i, 430 , 'Particle2', i + 45);
             pixelBlock.body.allowGravity = false;
        }
        this.pixelBlocks2.setAll('body.immovable', true);



        this.pixelBlocks3 = this.game.add.group();
        this.pixelBlocks3.enableBody = true;
        this.pixelBlocks3.physicsBodyType = Phaser.Physics.ARCADE;
        for(var i =0; i <15; i++){
        	var pixelBlock = this.pixelBlocks3.create (500 + 25 * i, 40 , 'Particle3', i);
             pixelBlock.body.allowGravity = false;
        }

         for(var i =0; i <15; i++){
        	var pixelBlock = this.pixelBlocks3.create (580 + 25 * i, 340 , 'Particle3', i + 15);
             pixelBlock.body.allowGravity = false;
        }

        for(var i =0; i <15; i++){
        	var pixelBlock = this.pixelBlocks3.create (580 + 25 * i, 310 , 'Particle3', i + 30);
             pixelBlock.body.allowGravity = false;
        }

        for(var i =0; i <15; i++){
        	var pixelBlock = this.pixelBlocks3.create (500 + 25 * i, 590 , 'Particle3', i + 45);
             pixelBlock.body.allowGravity = false;
        }
        this.pixelBlocks3.setAll('body.immovable', true);



        this.pixelBlocks4 = this.game.add.group();
        this.pixelBlocks4.enableBody = true;
        this.pixelBlocks4.physicsBodyType = Phaser.Physics.ARCADE;
        for(var i =0; i <15; i++){
        	var pixelBlock = this.pixelBlocks4.create (470 + 25 * i, 190 , 'Particle4', i);
             pixelBlock.body.allowGravity = false;
        }

        for(var i =0; i <15; i++){
        	var pixelBlock = this.pixelBlocks4.create (470 + 25 * i, 220 , 'Particle4', i + 15);
             pixelBlock.body.allowGravity = false;
        }

         for(var i =0; i <15; i++){
        	var pixelBlock = this.pixelBlocks4.create (580 + 25 * i, 460 , 'Particle4', i + 30);
             pixelBlock.body.allowGravity = false;
        }

        for(var i =0; i <15; i++){
        	var pixelBlock = this.pixelBlocks4.create (500 + 25 * i, 560 , 'Particle4', i + 45);
             pixelBlock.body.allowGravity = false;
        }
        this.pixelBlocks4.setAll('body.immovable', true);
        



        this.pixelBlocks5 = this.game.add.group();
        this.pixelBlocks5.enableBody = true;
        this.pixelBlocks5.physicsBodyType = Phaser.Physics.ARCADE;
        for(var i =0; i <15; i++){
        	var pixelBlock = this.pixelBlocks5.create (470 + 25 * i, 250 , 'Particle5', i);
             pixelBlock.body.allowGravity = false;
        }

         for(var i =0; i <15; i++){
        	var pixelBlock = this.pixelBlocks5.create (470 + 25 * i, 280 , 'Particle5', i + 15);
             pixelBlock.body.allowGravity = false;
        }

         for(var i =0; i <15; i++){
        	var pixelBlock = this.pixelBlocks5.create (470 + 25 * i, 530 , 'Particle5', i + 30);
             pixelBlock.body.allowGravity = false;
        }

         for(var i =0; i <15; i++){
        	var pixelBlock = this.pixelBlocks5.create (470 + 25 * i, 500 , 'Particle5', i + 45);
             pixelBlock.body.allowGravity = false;
        }
        this.pixelBlocks5.setAll('body.immovable', true);
        


	},

	

    addMovingBricks: function(){

        // adding the sprite
        this.movingBricks = this.add.sprite(100, 200, '55');
        this.game.physics.arcade.enable(this.movingBricks);
        this.movingBricks.anchor.setTo(0.5, 0.5);
        this.movingBricks.scale.setTo(0.25);
        this.movingBricks.body.allowGravity = false;
        this.movingBricks.body.immovable = true;

        this.moveOne = this.game.add.tween(this.movingBricks).to({ x: 400 }, 2000, Phaser.Easing.Linear.None) 
        .to({ y: 400 }, 2000, Phaser.Easing.Linear.None)
        .to({ x: 100 }, 2000, Phaser.Easing.Linear.None)
        .to({ y: 200 }, 2000, Phaser.Easing.Linear.None)
        .loop()
        .start();

        // adding the sprite
        this.movingBricks2 = this.add.sprite(400, 200, '55');
        this.game.physics.arcade.enable(this.movingBricks2);
        this.movingBricks2.anchor.setTo(0.5, 0.5);
        this.movingBricks2.scale.setTo(0.25);
        this.movingBricks2.body.allowGravity = false;
        this.movingBricks2.body.immovable = true;

        this.moveTwo = this.game.add.tween(this.movingBricks2).to({ y: 400 }, 2000, Phaser.Easing.Linear.None) 
        .to({ x: 100 }, 2000, Phaser.Easing.Linear.None)
        .to({ y: 200 }, 2000, Phaser.Easing.Linear.None)
        .to({ x: 400 }, 2000, Phaser.Easing.Linear.None)
        .loop()
        .start();

        // adding the sprite
        this.movingBricks3 = this.add.sprite(100, 400, '55');
        this.game.physics.arcade.enable(this.movingBricks3);
        this.movingBricks3.anchor.setTo(0.5, 0.5);
        this.movingBricks3.scale.setTo(0.25);
        this.movingBricks3.body.allowGravity = false;
        this.movingBricks3.body.immovable = true;

        this.moveThree = this.game.add.tween(this.movingBricks3).to({ y: 200 }, 2000, Phaser.Easing.Linear.None) 
        .to({ x: 400 }, 2000, Phaser.Easing.Linear.None)
        .to({ y: 400 }, 2000, Phaser.Easing.Linear.None)
        .to({ x: 100 }, 2000, Phaser.Easing.Linear.None)
        .loop()
        .start();


        // adding the sprite
        this.movingBricks4 = this.add.sprite(400, 400, '55');
        this.game.physics.arcade.enable(this.movingBricks4);
        this.movingBricks4.anchor.setTo(0.5, 0.5);
        this.movingBricks4.scale.setTo(0.25);
        this.movingBricks4.body.allowGravity = false;
        this.movingBricks4.body.immovable = true;

        this.moveFour = this.game.add.tween(this.movingBricks4).to({ x: 100 }, 2000, Phaser.Easing.Linear.None) 
        .to({ y: 200 }, 2000, Phaser.Easing.Linear.None)
        .to({ x: 400 }, 2000, Phaser.Easing.Linear.None)
        .to({ y: 400 }, 2000, Phaser.Easing.Linear.None)
        .loop()
        .start();


        // add the glitch button
        this.greenG = this.add.sprite(this.movingBricks4.x , this.movingBricks4.y - 25, 'greenButton');
        this.game.physics.arcade.enable(this.greenG);
        this.greenG.anchor.setTo(0.5, 0.5);
        this.greenG.body.allowGravity = false;

        this.blackG = this.add.sprite(this.movingBricks3.x , this.movingBricks3.y - 25, 'blackButton');
        this.game.physics.arcade.enable(this.blackG);
        this.blackG.anchor.setTo(0.5, 0.5);
        this.blackG.body.allowGravity = false;

        this.lightGreen = this.add.sprite(this.movingBricks2.x , this.movingBricks2.y - 25, 'DarkGreenkButton');
        this.game.physics.arcade.enable(this.lightGreen);
        this.lightGreen.anchor.setTo(0.5, 0.5);
        this.lightGreen.body.allowGravity = false;

        this.darkGreen = this.add.sprite(this.movingBricks.x , this.movingBricks.y - 25, 'lightGreen');
        this.game.physics.arcade.enable(this.darkGreen);
        this.darkGreen.anchor.setTo(0.5, 0.5);
        this.darkGreen.body.allowGravity = false;



    },


	YouLose: function(){

        //add the audio for losing and stop main
        this.ThePuzzleGameOverMusic.play();
        this.ThePuzzleGameOverMusic.volume = 0.2;
        this.mainGameMusic.stop();

        //add the tween and screen of game over page
        this.GameOverPannel = this.add.sprite(0, 1000, 'YouLoseLevel1');


        this.restartTheGame = this.game.add.button(500, 1000, 'restart', function(){

            this.resetThePuzzle();

            this.game.state.start('puzzle');

        }, this, 2,1,0 );
        this.restartTheGame.scale.setTo(0.5);

        this.backtomenugameoverbutton = this.game.add.button(420, 1000, 'backtoMainTheMenu', function(){

            this.resetThePuzzle();

            this.game.state.start('MainMenu');

        }, this,2,1,0 );
        this.backtomenugameoverbutton.scale.setTo(0.5);

        //add their tween 
        this.game.add.tween(this.GameOverPannel).to({y:0}, 1000, Phaser.Easing.Bounce.Out, true);
        this.game.add.tween(this.restartTheGame).to({y:400}, 1000, Phaser.Easing.Bounce.Out, true);
        this.game.add.tween(this.backtomenugameoverbutton).to({y:400}, 1000, Phaser.Easing.Bounce.Out, true);
	},


pausePuzzleGame: function(){

		 if(this.isThePuzzlePaused === false){
		 	this.isThePuzzlePaused = true;

            this.mainGameMusic.stop();

            this.playerMove = false;
            //pause teh player
            this.theHero.allowGravity = false;
            this.theHero.body.gravity.y = 0;
            this.theHero.body.velocity.y = 0;
            this.theHero.body.velocity.x = 0;
            this.theHero.body.gravity.x = 0;

            //game gravity
            this.game.physics.arcade.gravity.y = 0;

            this.theHero.animations.stop();

            //pause tweens
            this.moveOne.pause();
            this.moveTwo.pause();
            this.moveThree.pause();
            this.moveFour.pause();

            this.show();
		 }
	},


playPuzzleGame:function(){

		this.hide();
        this.playerMove = true;
        this.mainGameMusic.play('', 0, true);
        this.mainGameMusic.volume = 0.2;

        this.theHero.body.gravity.y = 300;
        this.game.physics.arcade.gravity.y = 400;

        //pause tweens
        this.moveOne.resume();
        this.moveTwo.resume();
        this.moveThree.resume();
        this.moveFour.resume();
	},


	show: function(){

        //Add the Buttons
        this.thePausePannel = this.add.sprite(1000, 0, 'pauseScreen');


        this.thecontinuebossbutton = this.game.add.button(1000, 385, 'continue', function(){
           
            this.isThePuzzlePaused = false;  
            this.playPuzzleGame();

            }, this,2,0,1);
        this.thecontinuebossbutton.scale.setTo(0.6);


        this.TheMainMenuBossButton = this.game.add.button(1000, 450, 'back', function(){

            this.resetThePuzzle();
            this.game.state.start('MainMenu');

        }, this,2,0,1 );
        this.TheMainMenuBossButton.scale.setTo(0.6);

        //Add the Tween
        this.game.add.tween(this.thePausePannel).to({x:447}, 1000, Phaser.Easing.Bounce.Out, true);
        this.game.add.tween(this.thecontinuebossbutton).to({x:690}, 1000, Phaser.Easing.Bounce.Out, true);
        this.game.add.tween(this.TheMainMenuBossButton).to({x:690}, 1000, Phaser.Easing.Bounce.Out, true);

},


	hide: function(){

	        this.game.add.tween(this.thePausePannel).to({x: 1000}, 500, Phaser.Easing.Linear.NONE, true);
	        this.game.add.tween(this.thecontinuebossbutton).to({x: 1000}, 500, Phaser.Easing.Linear.NONE, true);
	        this.game.add.tween(this.TheMainMenuBossButton).to({x: 1000}, 500, Phaser.Easing.Linear.NONE, true);

	},


    glitch: function(player, button){

        if (this.counter < 4){

            this.stopBrickes = true;
            if (this.switchCount === false  && this.outofGlitch === true){
                
                this.mainGameMusic.volume = 0;

                this.theswitchSound.play();
                //this.theswitchSound.volume = 0.1;
                button.frame = 1;

                //set triggers
                this.switchCount = true;
                this.outofGlitch = false;
                this.playglitch();      
                this.playerMove = false;
                player.paused = true;

                this.theHero.animations.stop();

                //start key timer
                this.time.events.add( 2000, this.updateglitch, this);
            }
        }
            
    },

    playglitch: function (){

        //this.gameMusic.volume = 0;
        this.theglitchSound.play();
        this.theglitchSound.volume = 0.1;
        this.screenGlitchEffect = this.game.add.sprite(0, 0, 'theGlitch');
        this.screenGlitchEffect.animations.alpha = 0.1;
        this.screenGlitchEffect.animations.add('Glitchenis', [0,1,2], 6, true);
        this.screenGlitchEffect.play('Glitchenis');

    },

    updateglitch: function(){

        //show enemy again
        this.screenGlitchEffect.alpha = 0;
        this.screenGlitchEffect.animations.stop();

        //change and move glitch counter
        this.playerMove = true;
        this.outofGlitch = true;
        this.inGlitch = true;

        //replay game music 
        this.mainGameMusic.volume = 0.2;

    },

    addStars: function(){

        this.stares.alpha = 1;
        this.staresVisable = true;
        //start key timer
        this.time.events.add( 9000, this.updateSwitch, this);

    },

    updateSwitch: function(){

        this.switchCount = false;
        this.stares.alpha = 0;
        this.staresVisable = false;
        this.stopBrickes = false;
        this.theswitch.frame = 0;
    },

    fallBlack: function(){

        
        this.blackG.frame = 1;


        for(var i =0; i <60; i++){

            this.pixelBlocks.getAt(i).body.allowGravity = true;

        }

       if (this.blackCounter === 0){
            
            this.theswitchSound.play('', 0, 1, false, false);
            this.fallingPixelsSound.play('', 0, 1, false, false);
            this.fallingPixelsSound.volume = 0.2;
            this.counter ++;
            this.blackCounter ++;
            console.log(this.counter);
        }
    }, 


    fallLightGreen: function(){

        this.greenG.frame = 1;
        

        for(var i =0; i <60; i++){

            this.pixelBlocks5.getAt(i).body.allowGravity = true;

        }

        if (this.GreenCounter === 0){

            this.theswitchSound.play('', 0, 1, false, false);
            this.fallingPixelsSound.play('', 0, 1, false, false);
            this.fallingPixelsSound.volume = 0.2;
            this.counter ++;
            this.GreenCounter ++;
            console.log(this.counter);
        }
    },   
  

    fallDarkGreen: function(){

        this.lightGreen.frame = 1;
        

        for(var i =0; i <60; i++){

            this.pixelBlocks2.getAt(i).body.allowGravity = true;

        }

        for(var i =0; i <60; i++){

            this.pixelBlocks3.getAt(i).body.allowGravity = true;

        }

        if (this.DarkGreenCounter === 0){
            
            this.theswitchSound.play('', 0, 1, false, false);
            this.fallingPixelsSound.play('', 0, 1, false, false);
            this.fallingPixelsSound.volume = 0.2;
            this.counter ++;
            this.DarkGreenCounter ++;
            console.log(this.counter);
        }
    },


    fallGreen: function(){

        this.darkGreen.frame = 1;
        

        for(var i =0; i <60; i++){

            this.pixelBlocks4.getAt(i).body.allowGravity = true;

        }

        if (this.finalGreenCount === 0){
            
            this.theswitchSound.play('', 0, 1, false, false);
            this.fallingPixelsSound.play('', 0, 1, false, false);
            this.fallingPixelsSound.volume = 0.2;
            this.counter ++;
            this.finalGreenCount ++;
            console.log(this.counter);
        }
    },


    CheckCounter: function(){

        if (this.puzzleTime > 0 && this.counter === 4){

            this.thejetUSB.alpha = 1;
            //this.thejetPlayer
        }
    },

    ShowPixelWithUSB: function(){

        this.isThePuzzlePaused = true;

        this.playerMove = false;
        this.theHero.body.velocity.x = 0;
        this.theHero.alpha = 0;
        this.thejetUSB.kill();
        this.mainGameMusic.stop();
        

        this.thejetIcon = this.add.sprite(this.theHero.x, this.theHero.y - 10, 'PixelWithredUsb');
        this.thejetIcon.anchor.setTo(0.5, 0.5);
        this.thejetIcon.scale.setTo(0.45);

        this.theHero.enableBody = true;
        this.theHero.body.gravity.y = 0;
        this.theHero.allowGravity = false;

        this.blockJetIcon = this.add.sprite(this.theHero.x - 5, 500, 'jetIcon');
        this.blockJetIcon.anchor.setTo(0.5, 0.5);
        this.blockJetIcon.scale.setTo(0.45);

        this.getRedUSBsound.play('', 0, 1, false, false);

        this.time.events.add( 2000, this.resumeGame, this);
    },


    resumeGame: function(){

        this.game.physics.arcade.gravity.y = 0;

        var x = this.theHero.x;
        var y = this.theHero.y;

        this.thejetIcon.kill();
        this.blockJetIcon.kill();

        this.theHero =this.add.sprite( x, y - 10 , 'flyingPixel');
        this.game.physics.arcade.enable(this.theHero);
        this.theHero.anchor.setTo(0.5, 0.5);
        this.theHero.scale.setTo(0.45);

        this.theHero.animations.add('fly', [0,1]);
        this.theHero.animations.play('fly', 8, true);
        this.theHero.alpha = 1;
        this.theHero.body.velocity.x = 50;
        this.theHero.body.collideWorldBounds = false;

        this.MoveToNextLevelSound.play();
        this.MoveToNextLevelSound.volume = 0.2;

        this.time.events.add( 3000, this.theNextLevel, this);

        this.didgetusb = true;
        this.playerMove = false;
    },



    theNextLevel: function(){
       // this.PostHighScore(playerScore);
        console.log("score"+playerScore);
        this.resetThePuzzle();
        this.state.start('Levelone');
    },



resetThePuzzle: function(){
        this.lvlScore=0;
    	this.puzzleBG = null;

        //time variables
        this.timeboardPuzzle = null;
        this.puzzleTextStyle = {font: "14px Arial", fill: "#fff", stroke: "#575957", strokeThickness: 3, align: "center"};
        this.PuzzleTimeText = null;
        this.puzzleTime = 60;
        this.inThetimeState = false;
        this.timePuzzleisup = false;


        //game pause level
        this.isThePuzzlePaused = false;
        this.puzzlePausebtn = null;

        //player elements
        this.theHero = null;
        this.HeroMovment = null;
        this.playerMove = true;

        //pixel blocks elements
        this.pixelBlocks = null;
        this.pixelBlocks2 = null;
        this.pixelBlocks3 = null;
        this.pixelBlocks4 = null;
        this.pixelBlocks5 = null;

        //button elements
        this.movingBricks = null;
        this.movingBricks2 = null;
        this.movingBricks3 = null;
        this.movingBricks4 = null;
        this.moveOne = null;
        this.moveTwo = null;
        this.moveThree = null;
        this.moveFour = null;
        this.greenG = null;
        this.blackG = null;
        this.lightGreen = null;
        this.darkGreen = null;
        this.stopBrickes = false;

        //the switch elements
        this.theswitch = null;
        this.switchCount = false;
        this.screenGlitchEffect = null;
        this.stares = null;
        this.staresVisable = false;
        this.inGlitch = false;
        this.outofGlitch = true;

        //wining game
        this.counter = 0;
        this.blackCounter = 0;
        this.GreenCounter = 0;
        this.DarkGreenCounter = 0;
        this.finalGreenCount = 0;


        //instructions element
        this.prelevelOneInstructions = null;
        this.precloselvl1btn = null;

        //fininshing the level elements
        this.thejetUSB = null;
        this.thejetIcon = null;
        this.thejetPlayer = null;
        this.blockJetIcon = null;
        this.didgetusb = false;

        //player health
        this.emptyHeart = null;
        this.fullHeart = null;

        //audio elements
        this.ThePuzzleGameOverMusic = null;
        this.thejumpSound = null;
        this.theswitchSound = null;
        this.theglitchSound = null;
        this.mainGameMusic = null;
        this.fallingPixelsSound = null;
        this.getRedUSBsound = null;
        this.MoveToNextLevelSound = null;

	},
update: function(){
/*
    //score
    if(this.puzzleTime<=60)
        //playerScore=3500;  
    if(this.puzzleTime<=30)
        //playerScore=2500;        
    if(this.puzzleTime<=20)
       // playerScore=1500;            
    if(this.puzzleTime <=10)
       // playerScore=500;
  */        
    this.CheckCounter();

    if (this.didgetusb === true){
            this.theHero.body.velocity.x = 70;
        }


    //moving buttons
    this.greenG.x = this.movingBricks4.x;
    this.greenG.y = this.movingBricks4.y - 30;

    this.blackG.x = this.movingBricks3.x;
    this.blackG.y = this.movingBricks3.y - 30; 

    this.lightGreen.x = this.movingBricks2.x;
    this.lightGreen.y = this.movingBricks2.y - 30;

    this.darkGreen.x = this.movingBricks.x;
    this.darkGreen.y = this.movingBricks.y - 30;



    if (this.isThePuzzlePaused === false){

        //collision detection
        this.game.physics.arcade.overlap(this.theHero, this.theswitch, this.glitch, null, this);

        this.game.physics.arcade.collide(this.theHero, this.movingBricks);
        this.game.physics.arcade.collide(this.theHero, this.movingBricks2);
        this.game.physics.arcade.collide(this.theHero, this.movingBricks3);
        this.game.physics.arcade.collide(this.theHero, this.movingBricks4);

        this.game.physics.arcade.overlap(this.theHero, this.blackG, this.fallBlack, null, this);
        this.game.physics.arcade.overlap(this.theHero, this.greenG, this.fallLightGreen, null, this);
        this.game.physics.arcade.overlap(this.theHero, this.lightGreen, this.fallDarkGreen, null, this);
        this.game.physics.arcade.overlap(this.theHero, this.darkGreen, this.fallGreen, null, this);

        this.game.physics.arcade.collide(this.theHero, this.pixelBlocks);
        this.game.physics.arcade.collide(this.theHero, this.pixelBlocks2);
        this.game.physics.arcade.collide(this.theHero, this.pixelBlocks3);
        this.game.physics.arcade.collide(this.theHero, this.pixelBlocks4);
        this.game.physics.arcade.collide(this.theHero, this.pixelBlocks5);

        this.game.physics.arcade.overlap(this.theHero, this.thejetUSB, this.ShowPixelWithUSB, null, this);

        
        if(this.staresVisable === true){
            this.game.physics.arcade.collide(this.theHero, this.stares);
        }


        if(this.inGlitch === true){
            this.inGlitch = false;

            this.stares.alpha = 1;
            this.staresVisable = true;

            //start key timer
            this.time.events.add( 9000, this.updateSwitch, this);
        }


         //add player movment
         this.theHero.body.velocity.x = 0;
                    
         if(this.playerMove === true){
            if(this.HeroMovment.left.isDown){
                this.theHero.body.velocity.x = -100;
                this.theHero.animations.play('left');
            }

            else if(this.HeroMovment.right.isDown){
                this.theHero.body.velocity.x = 100;
                this.theHero.animations.play('right');
            }

            else{
                 this.theHero.animations.stop();
                 this.theHero.frame = 3;
                }

            if(this.HeroMovment.up.isDown && (this.theHero.body.onFloor() || this.theHero.body.touching.down)){
                this.thejumpSound.play();
                this.thejumpSound.volume = 0.1;
                this.theHero.animations.stop();
                this.theHero.body.velocity.y = -290;
              }
        }
    }
   }
   
};