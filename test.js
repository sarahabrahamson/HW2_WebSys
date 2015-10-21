  (function( $ ) {
    function hexFromRGB(r, g, b) {
      var hex = [
        r.toString( 16 ),
        g.toString( 16 ),
        b.toString( 16 )
      ];
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
    function refreshSwatch() {
      var red = $( "#red" ).slider( "value" ),
          green = $( "#green" ).slider( "value" ),
          blue = $( "#blue" ).slider( "value" ),
          hex = hexFromRGB( red, green, blue );
      $("#redt").change(function() {
          $("#red").slider("value", parseInt($("#redt").val(), 16));
      });
      $("#greent").change(function() {
          $("#green").slider("value", parseInt($("#greent").val(), 16));
      });
      $("#bluet").change(function() {
          $("#blue").slider("value", parseInt($("#bluet").val(), 16));
      });
      $( "#swatch" ).css( "background-color", "#" + hex );
    }
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
      $( "#swatch1" ).css( "background-color", "#" + hex );
    });
    function generateStartVal() {
      // randomize rgb values and use hexFromRGB
      // update game swatch value
      // return rgb values
    }
    function getScore(expected, actual) {
        return (Math.abs(expected - actual) / 255) * 100;
    }
   
    $.fn.colorCompare = function(diff, turns) {
        var start = new Date();
        var score = 0, i = 0;
        $("#getScore").click(function(){
          if(i < turns){
            var rgb_expected = [125,100,230];//generateStartVal;
            var red = $( "#red" ).slider( "value" ),
              green = $( "#green" ).slider( "value" ),
              blue = $( "#blue" ).slider( "value" ),
              red_expected = rgb_expected[0],
              green_expected = rgb_expected[1],
              blue_expected = rgb_expected[2];
            hex = hexFromRGB( red, green, blue );
            var perOff = (getScore(red, red_expected) + getScore(green, green_expected) + getScore(blue, blue_expected)) / 3;
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
