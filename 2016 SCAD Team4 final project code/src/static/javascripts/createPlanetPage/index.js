$(document).ready(function(){
	if(new_user == 1){
$("#new_planet").show();
	$("#planet_add").click(function(){
        $("#new_planet").hide();
        var color = $(".carousel-inner .active h3").html();
        if(color == "Yellow"){
        	$("#yellow").attr("selected", true);
        }else if(color == "Red"){
        	$("#red").attr("selected", true);
        }else if(color == "Blue"){
        	$("#blue").attr("selected", true);
        }else if(color == "White"){
        	$("#white").attr("selected", true);
        }
    });
	
	}
    
});