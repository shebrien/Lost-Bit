pixel.simon = function(game){
    this.bgLights = null;
    this.lights = null;
    this.emptyLights = null;
    this.didTheTestStart = false;
    this.number = 1;

    this.lightnumber = 0;
    this.countsToGetUSB = 10;
    this.sequence = [];

    //computer turn varables
    this.computerTurn = false;
    this.litLight = 0;
    this.checkTime = null;
    this.currentCount = 0;

    //moving pillars
    this.pillargroup = null;
    this.pillarX = [784, 829, 870, 912];
    this.pillarY = -223;

    //check game varaibales
    this.correctLight = 0;
    this.playerCount = 0;
    this.theSelectedLigt = 0;

    //result of test
    pixel.loseTest = false;
    pixel.winTheTest = false;

    //audio elements of the game
    this.lightSound = null;
    this.winSound = null;
    this.LoseSound = null;

    //worrior elements
    this.worrior = null;
    this.simonSpeech = null;

}

pixel.simon.prototype = {

    create: function() {
    	 this.bgLights = this.add.sprite(0, 0, 'SimonBG2');

    	 //add empty light 
    	 this.emptyLights = this.game.add.group();
    	 for(var i = 0; i <3; i++){
    	 	var item = this.emptyLights.create(358 + 75 * i,280, 'SimonLightsOFF', i);
    	 }
    	 for(var i = 0; i <3; i++){
    	 	var item = this.emptyLights.create(358 + 75 * i,380, 'SimonLightsOFF', i + 3);
    	 }


    	 //add the light group that will be used in the game
    	 this.lights = this.game.add.group();

    	 for(var i = 0; i <3; i++){
    	 	var item = this.lights.create(347 + 75 * i,280, 'SimonLights', i);

    	 	//enable the variable
    	 	item.inputEnabled = true;
    	 	item.input.start(0, true);
    	 	item.events.onInputDown.add(this.select);
    	 	item.events.onInputUp.add(this.release, this);
    	 	item.events.onInputOut.add(this.moveOff);
    	 	this.lights.getAt(i).alpha = 0;
    	 }

    	 for(var i = 0; i <3; i++){
    	 	var item = this.lights.create(347 + 75 * i,380, 'SimonLights', i + 3);

    	 	//enable the variable
    	 	item.inputEnabled = true;
    	 	item.input.start(0, true);
    	 	item.events.onInputDown.add(this.select);
    	 	item.events.onInputUp.add(this.release, this);
    	 	item.events.onInputOut.add(this.moveOff);
    	 	this.lights.getAt(i + 3).alpha = 0;
    	 }

         // add pillar group
         this.pillargroup = this.game.add.group();
         for (var i =0; i <4; i++){

            var pillar = this.pillargroup.create(this.pillarX[i], this.pillarY, 'SimonPillars', i);
            this.game.add.tween(pillar).to({y: pillar.y - 100 }, 1500 + Math.random() * 3000, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);
         }

         //Add audio elements to game
         this.lightSound = this.game.add.audio('glowLightSound');
         this.lightSound.volume = 0.1;
         this.winSound = this.game.add.audio('winTestSound');
         this.LoseSound = this.game.add.audio('loseTestSound');

        
        //time function to add worrior buble
        this.game.time.events.add(1000, this.addWorrior, this);

        
    },

    addWorrior: function(){

        this.worrior = this.game.add.sprite(0, 350, 'worrior');
        this.worrior.scale.setTo(0.7);

        //time function to add speech buble
        this.game.time.events.add(900, this.addSpeechBubble, this);
    },

    addSpeechBubble: function(){
        this.simonSpeech = this.game.add.sprite(160, 200, 'simonSpeech1');
        this.simonSpeech.scale.setTo(0.6);
        this.game.time.events.add(10000, this.addSpeechBubble2, this);
    },

    addSpeechBubble2: function(){
        this.simonSpeech.alpha = 0;
        this.simonSpeech = this.game.add.sprite(160, 200, 'simonSpeech2');
        this.simonSpeech.scale.setTo(0.6);
        this.game.time.events.add(7000, this.startThisTest, this);
    },

    startThisTest:function(){
        this.worrior.alpha = 0;
        this.simonSpeech.alpha = 0;
        var that = this;
        this.startLightTest();
        this.setUptheGame();
        //this.game.time.events.add(5000,this.ligtSequence, this);
        setTimeout( function(){that.ligtSequence(); that.didTheTestStart = false;}, 5000);
    },


    startLightTest: function(){

    	this.didTheTestStart = true;

    	for (var i = 0; i < 6; i++)
    	{
    		this.game.add.tween(this.lights.getAt(i)).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 4, true).to( { alpha: .25 }, 500, Phaser.Easing.Linear.None, true);
    	}
    },

    setUptheGame: function(){

    	for(var i = 0; i < this.countsToGetUSB; i++){
    		this.lightnumber = this.game.rnd.integerInRange(0,5);
    		this.sequence.push(this.lightnumber);
    	}
    	console.log(this.sequence);
    },


    ligtSequence: function(){
    	//this.didTheTestStart = false;

    	//game start
    	this.computerTurn = true;
    	this.litLight = this.sequence[this.currentCount];
    	this.lights.getAt(this.litLight).alpha = 1;
        this.lightSound.play();
        this.lightSound.volume = 0.1;
    	this.checkTime = this.game.time.now;
    	this.currentCount ++;

    },

    select:function(item, pointer){
    	
    	if(!this.computerTurn && !this.didTheTestStart  && !pixel.loseTest && !pixel.winTheTest){
    		item.alpha =1;
    	}
    },

    release:function(item, pointer){

    	if(!this.computerTurn && !this.didTheTestStart  && !pixel.loseTest && !pixel.winTheTest){
    		item.alpha =0.25;
            //this.lightSound.play();
    		this.playerSequence(item);
    	}
    },


    moveOff:function(item, pointer){

    	if(!this.computerTurn && !this.didTheTestStart  && !pixel.loseTest && !pixel.winTheTest){
    		item.alpha =0.25;
    	}
    },

    playerSequence:function(selected){

    	this.correctLight = this.sequence[this.playerCount]
    	this.playerCount++;
    	
    	this.theSelectedLigt = this.lights.getIndex(selected)
    	

    	if(this.theSelectedLigt === this.correctLight){

    		if(this.playerCount === this.number){

    			if(this.number === this.countsToGetUSB){

    				pixel.winTheTest = true;
                    pixel.getUSB = true;
    				console.log("You win the game");
                    pixel.isTheLevelPaused = false;
                    this.winSound.play();
                    this.winSound.volume = 0.25;
                    this.worrior.alpha = 1;
                    this.simonSpeech = this.game.add.sprite(160, 200, 'simonWin');
                    this.simonSpeech.scale.setTo(0.6);
                    pixel.EnteredSimon = true;
                    this.restartTest();
                    this.game.time.events.add(7000, this.moveBackToLevel, this);
                    //this.state.start('LevelTwo');
    				
    				//add wining function
    			}
    			else{
    				this.playerCount = 0;
    				this.currentCount = 0;
    				this.number ++;
    				this.computerTurn = true;

    				console.log(this.theSelectedLigt);
    				console.log(this.computerTurn);
    				console.log(this.number);
    			}
    			
    		}
    		
    	} else{

    		pixel.loseTest = true;
    		console.log("You lose the game");
            pixel.isTheLevelPaused = false;
            this.LoseSound.play();
            this.LoseSound.volume = 0.25;
            this.worrior.alpha = 1;
            this.simonSpeech = this.game.add.sprite(160, 200, 'simonLose');
            this.simonSpeech.scale.setTo(0.6);
            pixel.EnteredSimon = true;
            this.restartTest();
            this.game.time.events.add(7000, this.moveBackToLevel, this);
            //this.state.start('LevelTwo');
    		//add losing function
    	}

    },

    moveBackToLevel:function(){

        this.state.start('LevelTwo');
    },

    updateGame:function(){

    	if(this.currentCount < this.number){
    		this.game.paused = false;
    		this.ligtSequence();
    	}

    	else{
    		this.computerTurn = false;
    		this.game.paused = false;
    	}

    },

    restartTest: function(){

	    this.bgLights = null;
	    this.lights = null;
	    this.emptyLights = null;
	    this.didTheTestStart = false;
	    this.number = 1;

	    this.lightnumber = 0;
	    this.countsToGetUSB = 10;
	    this.sequence = [];

	    //computer turn varables
	    this.computerTurn = false;
	    this.litLight = 0;
	    this.checkTime = null;
	    this.currentCount = 0;

	    //check game varaibales
	    this.correctLight = 0;
	    this.playerCount = 0;
	    this.theSelectedLigt = 0;

        //audio elements of the game
        this.lightSound = null;
        this.winSound = null;
        this.LoseSound = null;

        //worrior elements
        this.worrior = null;
        this.simonSpeech = null;
    },


    update: function(){
    	var that = this;
    	if(this.computerTurn == true){

    		if(this.game.time.now - this.checkTime > 750-this.number*40){
    			this.lights.getAt(this.litLight).alpha = 0.25;
    			this.game.paused = true;

    			//this.game.time.events.add(400 - this.number * 20,this.updateGame, this);

    			 setTimeout(function(){

    			 	if(that.currentCount < that.number){
    			 		that.game.paused = false;
    			 		that.ligtSequence();
    			 	}
    			 	else{
    					that.computerTurn = false;
    			 		that.game.paused = false;
    			 	}
    			 }, 400 - this.number * 20);
    			
    		}
    	}

    }

};
