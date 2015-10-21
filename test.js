  (function( $ ) {
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

      $.each( hex, function( nr, val ) {
        if ( val.length === 1 ) {
          hex[ nr ] = "0" + val;
        }
      });
      return hex.join( "" ).toUpperCase();
    }
    //function from the jQueryUI colorpicker
    function refreshSwatch() {
      var red = $( "#red" ).slider( "value" ),
          green = $( "#green" ).slider( "value" ),
          blue = $( "#blue" ).slider( "value" ),
          hex = hexFromRGB( red, green, blue );

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

    // from jQueryUI colorpicker
    $(function() {
      $( "#red, #green, #blue" ).slider({
        orientation: "horizontal",
       range: "min",
       max: 255,
        value: 127,
        slide: refreshSwatch,
        change: refreshSwatch
      });
      $( "#red" ).slider( "value", 255 );
      $( "#green" ).slider( "value", 255 );
      $( "#blue" ).slider( "value", 255 );
      var hex = hexFromRGB(125,100,230);
      $( "#game-user-swatch" ).css( "background-color", "#" + hex );
    });

    function generateStartVal() {
      // randomize rgb values and use hexFromRGB
      // update game user-swatch value
      // return rgb values
    }

    // gets the percent error
    function getError(expected, actual) {
        return (Math.abs(expected - actual) / 255) * 100;
    }
   
    $.fn.colorCompare = function(diff, turns) {
        var start = new Date();
        var score = 0, i = 0;
        $("#getScore").click(function(){
          if(i < turns){                        //loop to keep track of # of turns
            var rgb_expected = [125,100,230];//generateStartVal;
            var red = $( "#red" ).slider( "value" ),
              green = $( "#green" ).slider( "value" ),
              blue = $( "#blue" ).slider( "value" ),
              red_expected = rgb_expected[0],
              green_expected = rgb_expected[1],
              blue_expected = rgb_expected[2];
            hex = hexFromRGB( red, green, blue );
            var perOff = (getError(red, red_expected) + getError(green, green_expected) + getError(blue, blue_expected)) / 3;
            var time = new Date() - start;
            var total = ((15 - diff - perOff) / (15 - diff)) * (15000 - time);
            if (total < 0) { total = 0;}
            $("#color").html("Your score for this guess is:  " + total.toFixed(2)); 
            score += total;
            $("#score").html("Your total score:              " + score.toFixed(2));
            start = new Date();
          }
          i++;
        });

  }
 
}( jQuery ));

$("#getScore").colorCompare(4, 5); // 4 is the difficulty and 5 is the amount of turns
