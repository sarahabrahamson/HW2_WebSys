$( document ).ready(function() {
    $(".plugin").hexed();
    
    
    $(".instructions").toggle();
    $("button").click(function(){
        $(".instructions").toggle();
    });
});

$.fn.hexed = function() {
//--------------------------------------------------------------------------
// Helper Functions    
//--------------------------------------------------------------------------
    //generate random color values
    function generateStartVal() {
        var a = Math.floor((Math.random() * 255) + 1);
        var b = Math.floor((Math.random() * 255) + 1);
        var c = Math.floor((Math.random() * 255) + 1);

        var myRGB = [a,b,c];
        return myRGB;
    }
    
    // Function from the jQueryUI colorpicker
    function hexFromRGB(r, g, b) {
        var hex = [
            r.toString( 16 ),
            g.toString( 16 ),
            b.toString( 16 )
        ];

        // modified to update the textbox values
        $("#redt").val(r.toString(16));
        $("#greent").val(g.toString(16));
        $("#bluet").val(b.toString(16));

        $.each( hex, function( nr, val ){
            if ( val.length === 1 ) {
                hex[ nr ] = "0" + val;
            }
        });

        return hex.join( "" ).toUpperCase();
    }
    
    // gets the percent error
    function getError(expected, actual) {
        return (Math.abs(expected - actual) / 255) * 100;
    }
      
//--------------------------------------------------------------------------
// Setting the game up    
//--------------------------------------------------------------------------
    // Set the initial game color
    var myRGB = generateStartVal();
    var actual_r = myRGB[0];
    var actual_g = myRGB[1];
    var actual_b = myRGB[2];
    var hex = hexFromRGB(actual_r,actual_g,actual_b);
    $( "#game-swatch" ).css( "background-color",'#' + hex );
    
    //Set the user's initial colors
    var user_r = 255;
    var user_g = 255;
    var user_b = 255;
    hex = hexFromRGB(user_r,user_g,user_b);
    $( "#user-swatch" ).css( "background-color",'#' + hex );
    
    
    
    var score = 0;
    var start;
    var i = 0;
    
    // Set the html
    $("head").append('<link rel="stylesheet" type="text/css" href="hexed-style.css">'); // Adding in the style for the plugin
    this.append('<div id="myHeader"><h1>Hexed! - A jQuery Game</h1><button>Show Instructions</button><p class="instructions">Your goal is to guess the color on the left.</p><p class="instructions">Use the sliders below to represent your guess.</p><p class="instructions">When you think you have your answer, click the "Check It!" button.</p><p class="instructions">You have a limited number of turns to find the answer. Good Luck!</p>');
    this.append('<section class="swatches"><div id="game-swatch" class="ui-widget-content ui-corner-all"></div><div id="user-swatch" class="ui-widget-content ui-corner-all"></div> ');
    this.append('<section id="redsection"><div id="red"></div> <input type="text" id="redt" value="0">');
    this.append('<section id="greensection"><div id="green"></div> <input type="text" id="greent" value="0">');
    this.append('<section id="bluesection"><div id="blue"></div> <input type="text" id="bluet" value="0"> ');
    this.append('<section id="diffturns"> Difficulty: <input type="number" id="diff" value="5" min="0" max="10"> Turns:<input type="number" id="turns" value="10" min="1">');
    this.append('<section class="score"><p id="color">Your score for this guess is:  </p><p id="score">Your total score: </p><p id="percent">Your percentage off: </p> <p id="turnsleft"></p>');
    this.append('<section class="submit"><input type="button" id="checkit" value="Check It!">');
    this.append('<p id="answers">');
    
    
    
    
    function refreshTurns(){
        var turns = $("#turns").val();
        turnsleft = turns - i;
        $("#turnsleft").html("Number of turn left is:    " + turns);
    }
    //Refreshes the turns if the element is changed.
   document.getElementById("turns").addEventListener("click",refreshTurns);
    
    
    
    
//--------------------------------------------------------------------------
// Setting up the listener for the swatch 
//--------------------------------------------------------------------------
    //function from the jQueryUI colorpicker
    function refreshSwatch() {
        user_r = $( "#red" ).slider( "value" );
        user_g = $( "#green" ).slider( "value" );
        user_b = $( "#blue" ).slider( "value" );
        hex = hexFromRGB( user_r, user_g, user_b); // Creates the HEX for the color value
        
        // modified to change the slider when textbox is changed
        $("#redt").change(function() {
            $("#red").slider("value", parseInt($("#redt").val(), 16));
        });
        
        $("#greent").change(function() {
            $("#green").slider("value", parseInt($("#greent").val(), 16));
        });
        
        $("#bluet").change(function() {
            $("#blue").slider("value", parseInt($("#bluet").val(), 16));
        });

        $( "#user-swatch" ).css( "background-color", "#" + hex );
    }
    //Starting the actual game itself now that the HTML is all set
    function startGame(){
        $("#diff").show();
        $("#diffturns").show();
        
        diff = $("#diff").val();
        turns = $("#turns").val();
        //Generate the game color randomly.
        myRGB = generateStartVal();
        actual_r = myRGB[0];
        actual_g = myRGB[1];
        actual_b = myRGB[2];
        hex = hexFromRGB(actual_r,actual_g,actual_b); // Creates the HEX for the games RGB Values
        //Setup the Answers HTML
        document.getElementById("answers").innerHTML = (hex); 
        $("#answers").hide();
        $( "#game-swatch" ).css( "background-color",'#' + hex );

        diff = $("#diff").val();
        turns = $("#turns").val();

        score = 0;
        start = new Date();
        i = 0;
        
        turnsleft = turns - i;
        
        //Defining some boxes to put in and information to put into the boxes
        $("#color").html("Your score for this guess is:  " + score.toFixed(2)); 
        $("#score").html("Your total score:              " + score.toFixed(2));
        $("#percent").html("Your percentage off:         " + score.toFixed(2));
        $("#turnsleft").html("Number of turn left is:    " + turnsleft);
        
        // from jQueryUI colorpicker
        $(function() {
            $( "#red, #green, #blue" ).slider({
                orientation: "horizontal",
                range: "min",
                max: 255,
                value: 255,
                slide: refreshSwatch,
                change: refreshSwatch
            });
            //Creating the sliders for the game
            $( "#red" ).slider( "value", user_r );
            $( "#green" ).slider( "value", user_g );
            $( "#blue" ).slider( "value", user_b );

            var hex = hexFromRGB(user_r,user_g,user_b);

            $( "#user-swatch" ).css( "background-color", "#" + hex );
        });
    }
     
    startGame(); // begins the colorcompare function - starts the timer
    $(document.getElementById("checkit")).click(function() {
        if(turnsleft==0){//If after all the turns and you clicked and still do not have the correct answer then you lost.
            $("#answers").show();
            alert("You did not get it :/");
            startGame();
            return;
        }

        var a = hexFromRGB(actual_r,actual_g,actual_b);
        var b = hexFromRGB(user_r,user_g,user_b);
        
        //if the value being guessed match the color randomly selected
        if(a===b){
            alert("You got it :)");
            
            var perOff = (getError(user_r, actual_r) + getError(user_g, actual_g) + getError(user_b, actual_b)) / 3;
            var time = new Date() - start;
            var total = Math.abs(((15 - diff - perOff) / (15 - diff)) * (15000 - time));
            
            if (total < 0) { total = 0;}
            $("#color").html("Your score for this guess is:  " + total.toFixed(2)); 
            score += total;
            $("#score").html("Your total score:              " + score.toFixed(2));
            $("#percent").html("Your percentage off:         " + perOff.toFixed(2));
            
            
            startGame();
            return;
        }
        //if the guess is wrong
        else {
            //keep track of scores
            if(i == 0){
                var perOff = (getError(user_r, actual_r) + getError(user_g, actual_g) + getError(user_b, actual_b)) / 3; // calculates the actual percent off
                var time = new Date() - start;//gets the current time
                var total = Math.abs(((15 - diff - perOff) / (15 - diff)) * (15000 - time));//does the calculation provided to us for the scoring

                if (total < 0) { total = 0;} // Printing out the scores to the html
                $("#color").html("Your score for this guess is:  " + total.toFixed(2)); 
                score += total;
                $("#score").html("Your total score:              " + score.toFixed(2));
                $("#percent").html("Your percentage off:         " + perOff.toFixed(2));

                start = new Date();
            }
            else {   
                var perOff = (getError(user_r, actual_r) + getError(user_g, actual_g) + getError(user_b, actual_b)) / 3;
                var time = new Date() - start;
                var total = Math.abs(((15 - diff - perOff) / (15 - diff)) * (15000 - time));
                
                if (total < 0) { total = 0;}
                $("#color").html("Your score for this guess is:  " + total.toFixed(2)); 
                score += total;
                $("#score").html("Your total score:              " + score.toFixed(2));
                $("#percent").html("Your percentage off:         " + perOff.toFixed(2));

            }
            i++;
            turnsleft--;
            $("#turnsleft").html("Number of turn left is:    " + turnsleft);
            
            $("#diff").hide();
            $("#diffturns").hide();
        }

        
    });
    
};