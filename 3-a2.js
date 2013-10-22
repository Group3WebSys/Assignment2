(function( $ ) {
	$.fn.hexed = function(){
		//Generate the tags
		var html_str="<h1>Test</h1><ul><li>1</li><li>2</li><li>3</li></ul>";
		this.html(html_str);
		alert("hex ok");
		return this;
	};

}( jQuery ));

$( document ).ready(function() {
        
        var difficulty = prompt("Please enter difficulty from 0 to 10",5);
        var turns = prompt("Please enter number of turns",5);
        $("#turns").val(turns);
        $("#difficulty").val(difficulty);
        var score = 0;
        $("#score").val(score);
        var turn = 1;
        $("#turn").val(turn);
        
        var color_real=getRandomColor();
        $( "span#randomcolor" ).html( color_real).hide();
        
        placeCircle(color_real, "circle_real");
        $("#circle_guess").hide();
        
        //Timer
        var intervalObj=startTimer();
        
        //Click event handler for "Got It!" 
        $("#submit_guess").click(function(e){
                
                e.preventDefault();
                var hex_red=convertDecToHex(parseInt($("#red").val()));
                var hex_green=convertDecToHex(parseInt($("#green").val()));
                var hex_blue=convertDecToHex(parseInt($("#blue").val()));
                var color_guess=hex_red+hex_green+hex_blue;
                placeCircle(color_guess, "circle_guess");
                readUserInput();
                $("#circle_guess").show();
                //Calculate score
                //Determine Percent off
                color_real = color_real.toString().substring(1);
                var given_red = parseInt(color_real.substring(0,2),16);
                var given_green = parseInt(color_real.substring(3,5),16);
                var given_blue = parseInt(color_real.substring(5),16);
                
                var per_red=percentOff(given_red, parseInt($("#red").val()));
                var per_green=percentOff(given_green, parseInt($("#green").val()));
                var per_blue=percentOff(given_blue, parseInt($("#blue").val()));
                var total_off=(per_red+per_green+per_blue)/3.0;
                stopTimer(intervalObj);
                
                //Keep score
                score += newScore(total_off, difficulty,  parseFloat($("#timer").val()));//changed this
                $("#score").val(parseInt(score));
                
                //Enable the Next! button
                $("#submit_next[type='submit']").button("enable");
                //Disable the Got it! button
                $("#submit_guess[type='submit']").button("disable");
                
        });
        
        //Disable the Next! button
        $("#submit_next[type='submit']").button("disable");
        //Click event handler for "Next!"
        $("#submit_next").click(function(e){
                e.preventDefault();
                intervalObj=startTimer();
                turn+=1;
                if (turn > turns) {
                        alert("end game");
                        //Hide all game widgets
                        $("#game").hide();
                        //Show Play again! button
                        $("#post_game").show();
                        //Analyze score
                        
                        //Reset timer, scores turns, difficulty...
                        stopTimer(intervalObj);
                        score=0;
                        turn=1;
                        difficulty = 5;
                        turns = 5;
                }
                else {
                        $("#turn").val(turn);
                        color_real=getRandomColor();
                        $( "span#randomcolor" ).html( color_real);
                        placeCircle(color_real, "circle_real");
                        $("#circle_guess").hide();
                }
                //Disable the Next! button
                $("#submit_next[type='submit']").button("disable");
                //Enable the Got it! button
                $("#submit_guess[type='submit']").button("enable");
        });
        
        //Hide Play again!
        $("#post_game").hide();
        //Click event handler for "Play again!"

  /*$("#again").click(function(e){
                $("#game").show();
                difficulty = prompt("Please enter difficulty from 0 to 10",5);
                turns = prompt("Please enter number of turns",5);
                startTimer();
                $("#post_game").hide();
        });*/

        $('#again').click(function(e) {
            location.reload();
        });
        
        //Converting the decimals on sliders to hexadecimals
        $("#red, #green, #blue").on("change", function() {
                var number = parseInt(this.value);
            if(this.id=="red"){
                    $("#red_hex").val(number.toString(16));
            }
            else if(this.id=="green"){
                    $("#green_hex").val(number.toString(16));
            }
            else{
                    $("#blue_hex").val(number.toString(16));
            }
        });
        
        
});


//Create plugin
$.fn.hexed=function(settings)
{
        //set default settings, overwrites it
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

function startTimer(){
        var start=new Date().getTime();
        var elapsed=0;
        $("#timer").val(elapsed);
        var intervalObj=window.setInterval(function(){
                var output="";
                var time=new Date().getTime()-start;
                elapsed=Math.floor(time/100)/10;
                if(elapsed==Math.floor(elapsed)){
                        output=elapsed.toString()+".0";
                }
                else{
                        output=elapsed.toString();
                }
                output+="s";
                $("#timer").val(output);
        },100);
        return intervalObj;
}

function stopTimer(intervalObj){
        window.clearInterval(intervalObj);
}
function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 

function percentOff(given, actual){
        var diff = given;
        diff = diff - actual;
        diff = Math.abs(diff); //Absolute value of difference
        var fin = diff / 255;
        fin = fin*100;
        
        return fin;
}

function newScore(poff, lev, time){
        var s = 50;
        //Difficulty component
        s = s - lev;
        //Subtract for % off
        s = s - poff;
        s= s/(15-lev);
        //Dertermine time component of score
        var milli = parseFloat(time) * 1000;
        var pt = 30000 - milli;
        s = (s*pt)/1000;
        if(s<0){
                s=0;
        }
        
        return s;
}
