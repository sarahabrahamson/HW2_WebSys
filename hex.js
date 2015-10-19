$(function() {
	// Function to get the user's r,g,b values and display the swatch
	$( "button" ).button().click(function() {
		// Get the r,g,b values
        var red   = 255;//$( "SLIDER SELECTER GOES HERE" ).slider( "value" );
		var green = 140;//$( "SLIDER SELECTER GOES HERE" ).slider( "value" );
		var blue  = 60;//$( "SLIDER SELECTER GOES HERE" ).slider( "value" );
		// Convert rgb to hex
		var hex_values = [red.toString(16), green.toString(16), blue.toString(16)];
		// Insert a 0 if the hex value is only one digit
		for (i = 0; i < hex_values.length; i++)
		{
			if (hex_values[i].length === 1)
				hex_values[i] = "0" + hex_values[i];
		}
		// Convert the array of hex values to one string that the CSS can use
		var hex = "#" + hex_values.join("").toUpperCase();
		// Set the color using CSS
		$( "#user-swatch" ).css( "background-color", hex );
	});
});