pixel.rank = function(game){
    
    this.instructionsPage;
    this.backtomenbutton
};

pixel.rank.prototype = {

    create: function() {

        //add background image
        this.instructionsPage = this.add.image(0, 0, 'rankBG');
        this.instructionsPage.inputEnabled = true;
        //boss level
        this.backtomenbutton = this.add.button( 750, this.world.centerY + 240, 'back',this.BackToMen,this, 1,0,2 );
        this.backtomenbutton.scale.setTo(0.57);
         
        playerScore=0;
        this.LeaderBoardScore();
    },

    

    BackToMen: function(pointer){
        this.state.start('MainMenu');

    },

    LeaderBoardScore: function(){
    var options = { // all of these are optional
        html: "<strong>Hi</strong>", // Optional, any custom html you want to show below the name
        recent: 3600, // Optional, to limit scores to ones posted in last x seconds
        sort: 'asc', // Optional, sorting by "asc" will show the lowest scores first (ex. for fastest times)
        filter: ['day', 'month'], // Optional, Array of filters to narrow down high scores
        cumulative: false, // Optional, if set to true grabs the sum of all scores for each player
        best: false, // Optional, if set to true grabs the best score from each player
        limit: 10, // Optional, how many scores to show (0 for all). Default is 10
        self: false, // Optional, Boolean if set to true shows just the scores of the player viewing
        friends: false, // Optional, Boolean if set to true shows just the scores of the player viewing AND their Clay.io friends
        showPersonal: true // Optional, Boolean on if the player's stats (rank & high score) should show below the name. Default is false
    };

    var callback = function( response ) { // Optional
         console.log( response );
    };
        pixel.leaderboard.show(options, callback );
    //this.leaderboard.show( options, callback );


    }


   


};
