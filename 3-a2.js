(function( $ ) {
 
    $.fn.showLinkLocation = function() {
 
        return this.filter( "a" ).append(function() {
            return " (" + this.href + ")";
        });
 
    };
 
}( jQuery ));

//Canvas manipulation
var circle=document.getElementById("circle");
var con=circle.getContext("2d");

var fillColor="";
//
fillColor="red";
//
con.fillStyle=fillColor;
con.beginPath();
con.arc(75, 75, 60, 0, 2*Math.PI);
con.stroke();
con.fill();