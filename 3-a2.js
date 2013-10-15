$( document ).ready(function() {
	//setUpGame
	$( "span#randomcolor" ).html( getRandomColor());
	//set up canvas
	var circle=document.getElementById("circle");
	var context=circle.getContext("2d");
	context.fillStyle=getRandomColor();
	context.arc(circle.width/2, circle.height/2, 60, 0, 2*Math.PI);
	context.fill();
	context.stroke();
});

function getRandomColor() {
	var color = '#'+Math.floor(Math.random()*16777215).toString(16);
	return color;
}

function convertDecToHex(dec) {
	var hex = dec.toString(16);
	return hex;
}

function convertHexToDec(hex) {
	var dec = parseInt(hex,16);
	return dec;
}
