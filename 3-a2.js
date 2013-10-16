$( document ).ready(function() {
	//setUpGame
	var color_real=getRandomColor();
	$( "span#randomcolor" ).html( color_real);
	placeCircle(color_real, "circle_real");

	
	$("#submit").click(function(e){
		e.preventDefault();
		var hex_red=convertDecToHex(parseInt($("#red").val()));
		var hex_green=convertDecToHex(parseInt($("#green").val()));
		var hex_blue=convertDecToHex(parseInt($("#blue").val()));
		var color_guess=hex_red+hex_green+hex_blue;
		placeCircle(color_guess, "circle_guess");
		readUserInput();
		location.reload();
	});
});


//Create plugin
$.fn.hexed=function(settings)
{
	//set default settings
	settings=$.extend({
		diffculty: "5",
		turns: "10"
	}, settings);
	
}

function placeCircle(color, circleID) {
	var circle=document.getElementById(circleID);
	var context=circle.getContext("2d");
	context.fillStyle=color;
	context.arc(circle.width/2, circle.height/2, 60, 0, 2*Math.PI);
	context.fill();
	context.stroke();
}

function getRandomColor() {
	var color = '#'+Math.floor(Math.random()*16777215).toString(16);
	return color;
}

//dec should be an integer
function convertDecToHex(dec) {
	var hex = dec.toString(16);
	return hex;
}

//hex should be a string
function convertHexToDec(hex) {
	var dec = parseInt(hex,16);
	return dec;
}

function readUserInput(){
	var result_msg="";
	
	result_msg="Answer:\n";
	var answer=$("span#randomcolor").html().slice(1);
	var red_answer=convertHexToDec(answer.substr(0,2));
	var green_answer=convertHexToDec(answer.substr(2,2));
	var blue_answer=convertHexToDec(answer.substr(4,2));
	result_msg=result_msg+"red: "+red_answer+"\n";
	result_msg=result_msg+"green: "+green_answer+"\n";
	result_msg=result_msg+"blue: "+blue_answer+"\n";
	
	result_msg=result_msg+"Your guess:\n";
	$("*").find("input[data-type='range']").each(function(){
		var temp=$(this).attr("name")+": "+$(this).attr("value")+"\n";
		result_msg=result_msg+temp;
	});
	alert(result_msg);
}
