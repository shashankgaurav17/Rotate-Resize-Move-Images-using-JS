$(document).ready(function() {
    $(".grid-icon-margin a .butas-icon").on('click',function(){
        $(this).toggleClass("butas-border");
        $('#svgx').append('<svg class="layers" x="80" y="80" height="500" width="560"><image xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/images/peacock.PNG" class="draggable"  onmousedown="selectElement(evt)" transform="matrix(1 0 0 1 0 0)" height="67" width="67" x="280" y="280"></image></svg>');
    });
  
    $(".btn-select").on("click",function(){
        $("#pane").toggleClass("isSelected");
    });

var count = 0;
    $(".btn-rotate").on("click",function(){
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
    

});	    