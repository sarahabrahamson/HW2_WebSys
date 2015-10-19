  (function( $ ) {
    function hexFromRGB(r, g, b) {
      var hex = [
        r.toString( 16 ),
        g.toString( 16 ),
        b.toString( 16 )
      ];
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
        var off = (Math.abs(expected - actual) / 255) * 100;
        var time = new Date() - start;
        var total = ((15 - 4 - off) / (15 - 4)) * (15000 - time);
        if (total <= 0) {
          return 0;
        }
        else {
          return total;
        };
    }
    function checkAll(){
        var rgb_expected = [125,100,230];//generateStartVal;
        var red = $( "#red" ).slider( "value" ),
          green = $( "#green" ).slider( "value" ),
          blue = $( "#blue" ).slider( "value" ),
          red_expected = rgb_expected[0],
          green_expected = rgb_expected[1],
          blue_expected = rgb_expected[2];
        var score = getScore(red, red_expected) + getScore(green, green_expected) + getScore(blue, blue_expected);
        $("#score").innerHTML = score;
    }
    var start = new Date();
    $.fn.colorCompare = function() {
        $("#getScore").onclick= function(){checkAll};
    };
 
}( jQuery ));

$("#getScore").colorCompare();