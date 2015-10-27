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
    var turnsleft = 10;
   
    
    $("#color").html("Your score for this guess is:  " + score.toFixed(2));
    $("#score").html("Your total score:              " + score.toFixed(2));
    
    // Set the html
    $("head").append('<link rel="stylesheet" type="text/css" href="hexed-style.css">');
    this.append('<section class="swatches"><div id="game-swatch" class="ui-widget-content ui-corner-all"></div><div id="user-swatch" class="ui-widget-content ui-corner-all"></div> ');
    this.append('<section id="redsection"><div id="red"></div> <input type="text" id="redt" value="0">');
    this.append('<section id="greensection"><div id="green"></div> <input type="text" id="greent" value="0">');
    this.append('<section id="bluesection"><div id="blue"></div> <input type="text" id="bluet" value="0"> ');
    this.append('<section id="diffturns"> Difficulty: <input type="number" id="diff" value="5" min="0" max="10"> Turns:<input type="number" id="turns" value="10" min="1">');
    this.append('<section class="score"><p id="color">Your score for this guess is:  </p><p id="score">Your total score: </p><p id="percent">Your percentage off: </p> <p id="turnsleft"></p>');
    this.append('<section class="submit"><input type="button" id="checkit" value="Check It!">');
//--------------------------------------------------------------------------
// Setting up the listener for the swatch 
//--------------------------------------------------------------------------
    //function from the jQueryUI colorpicker
    function refreshSwatch() {
        user_r = $( "#red" ).slider( "value" );
        user_g = $( "#green" ).slider( "value" );
        user_b = $( "#blue" ).slider( "value" );
        hex = hexFromRGB( user_r, user_g, user_b);
        
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
    

//--------------------------------------------------------------------------
// Reinitialize Values  
//--------------------------------------------------------------------------
    function colorCompare() {
        diff = $("#diff").val();
        turns = $("#turns").val();

        myRGB = generateStartVal();
        actual_r = myRGB[0];
        actual_g = myRGB[1];
        actual_b = myRGB[2];
        hex = hexFromRGB(actual_r,actual_g,actual_b);
        
//        document.getElementById("answers").innerHTML = (hex);
        $( "#game-swatch" ).css( "background-color",'#' + hex );

        diff = $("#diff").val();
        turns = $("#turns").val();

        score = 0;
        start = new Date();
        i = 0;
        
        turnsleft = turns - i;
        
        
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

            $( "#red" ).slider( "value", user_r );
            $( "#green" ).slider( "value", user_g );
            $( "#blue" ).slider( "value", user_b );

            var hex = hexFromRGB(user_r,user_g,user_b);

            $( "#user-swatch" ).css( "background-color", "#" + hex );
        });
    }
    
    
    colorCompare(); // begins the colorcompare function - starts the timer
    
    $(document.getElementById("checkit")).click(function() {
        var a = hexFromRGB(actual_r,actual_g,actual_b);
        var b = hexFromRGB(user_r,user_g,user_b);
        
        
        if(a===b){ 
            turnsleft--;
            var perOff = (getError(user_r, actual_r) + getError(user_g, actual_g) + getError(user_b, actual_b)) / 3;
            var time = new Date() - start;
            var total = Math.abs(((15 - diff - perOff) / (15 - diff)) * (15000 - time));
            
            if (total < 0) { total = 0;}
            $("#color").html("Your score for this guess is:  " + total.toFixed(2)); 
            score += total;
            $("#score").html("Your total score:              " + score.toFixed(2));
            $("#percent").html("Your percentage off:         " + perOff.toFixed(2));
            $("#turnsleft").html("Number of turn left is:    " + turnsleft);
            
            start = new Date();
            
            alert("you got it!");
            colorCompare();
            
            user_r = 255;
            user_g = 255;
            user_b = 255;
            
            $( "#red" ).slider( "value", 255 );
            $( "#green" ).slider( "value", 255 );
            $( "#blue" ).slider( "value", 255 );

            hex = hexFromRGB(user_r,user_g,user_b);
            $( "#user-swatch" ).css( "background-color", "#" + hex );
            
            $("#diff").show();
            $("#diffturns").show();
        }
        else {
            turnsleft--;
            //keep track of scores
            if(i < turns){
                var perOff = (getError(user_r, actual_r) + getError(user_g, actual_g) + getError(user_b, actual_b)) / 3;
                var time = new Date() - start;
                var total = Math.abs(((15 - diff - perOff) / (15 - diff)) * (15000 - time));

                if (total < 0) { total = 0;}
                $("#color").html("Your score for this guess is:  " + total.toFixed(2)); 
                score += total;
                $("#score").html("Your total score:              " + score.toFixed(2));
                $("#percent").html("Your percentage off:         " + perOff.toFixed(2));
                $("#turnsleft").html("Number of turn left is:    " + turnsleft);
                

                start = new Date();
            }
            else {
                alert("you did not get it :/");
                $("#turnsleft").html("Number of turn left is:    " + turnsleft);
                
                
                
                colorCompare();

                user_r = 255;
                user_g = 255;
                user_b = 255;

                $( "#red" ).slider( "value", 255 );
                $( "#green" ).slider( "value", 255 );
                $( "#blue" ).slider( "value", 255 );

                hex = hexFromRGB(user_r,user_g,user_b);
                $( "#user-swatch" ).css( "background-color", "#" + hex );
                
                $("#diff").show();
                $("#diffturns").show();
            }
            i++;
            
            
            $("#diff").hide();
            $("#diffturns").hide();
        }
    });
    
};