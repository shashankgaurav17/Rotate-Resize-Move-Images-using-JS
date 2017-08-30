$(document).ready(function() {

var count = 0;
    $("#rotate_right").on("click",function(){
		//$("#pane").css("transform","rotate(90deg)");
        if(count == 0){
            $("#pane").css("transform","rotate(90deg)");
            count++;
        } 
        else if (count == 1){
            $("#pane").css("transform","rotate(180deg)");
            count++;
        }  
        else if (count == 2){
            $("#pane").css("transform","rotate(270deg)");
            count++;
        }
        else {
            $("#pane").css("transform","rotate(360deg)");
            count=0;
        }
    });
	
var count1 = 0;
    $("#rotate_left").on("click",function(){
		//$("#pane").css("transform","rotate(90deg)");
        if(count1 == 0){
            $("#pane").css("transform","rotate(-90deg)");
            count1++;
        } 
        else if (count1 == 1){
            $("#pane").css("transform","rotate(-180deg)");
            count1++;
        }  
        else if (count1 == 2){
            $("#pane").css("transform","rotate(-270deg)");
            count1++;
        }
        else {
            $("#pane").css("transform","rotate(-360deg)");
            count1=0;
        }
    });
    

});	    