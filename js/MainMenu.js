pixel.MainMenu = function(game){
    this.startBG;
    this.instructions;
    this.rank;
    this.theLogo;
};

pixel.MainMenu.prototype = {

    create: function() {

        //add background image
        this.startBG = this.add.image(0, 0, 'menumain');
        this.startBG.inputEnabled = true;

        this.theLogo = this.add.sprite(this.world.centerX -250, this.world.centerY - 220, "logoMenu");
        this.theLogo.animations.add('glitchlogo', [0,0,0,0,1,2,2,1,0,0,0,0], 6, true);
        this.theLogo.alpha = 0;

        this.game.add.tween(this.theLogo).to( { alpha: 1}, 2400, Phaser.Easing.Linear.None, true);

        
        this.theLogo.play('glitchlogo');

        //level one
        this.add.button(this.world.centerX - 100,this.world.centerY + 250, 'start',this.LevelOne,this, 2,1,0 );

        //instructions level
        this.instructions = this.add.button( 890, 20 , 'instructions',this.startInstructionState,this, 1,0,2 );
        this.instructions.scale.setTo(0.6);
        playerScore=0;

         //instructions level
        this.rank = this.add.button( 890, 90 , 'ranking',this.startrank,this, 1,0,2 );
        this.rank.scale.setTo(0.6);
        playerScore=0;
        
    },

    

    LevelOne: function(pointer){


        this.state.start('Story');

    },


    startInstructionState: function(pointer){
        this.state.start('Instructions');
    },

    startrank: function(pointer){
        this.state.start('rank');
    }


};
