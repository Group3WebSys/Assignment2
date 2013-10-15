$( document ).ready(function() {
	setUpGame
	$( "span#randomcolor" ).html( getRandomColor() );
});

function getRandomColor() {
	var color = '#'+Math.floor(Math.random()*16777215).toString(16);
	return color;
}

function convertDecToHex(var dec) {
	var hex = dec.toString(16);
	return hex;
}

function convertHexToDec(var hex) {
	var dec = parseInt(hex,16);
	return dec;
}
