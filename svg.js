var selectedElement = 0;
var currentX = 0;
var currentY = 0;
var currentMatrix = 0;

function selectElement(evt) {
	console.log("select e;ement function called");
    selectedElement = evt.target;
    currentX = evt.clientX;
    currentY = evt.clientY;
    currentMatrix = selectedElement.getAttributeNS(null, "transform").slice(7,-1).split(' ');

    for(var i=0; i<currentMatrix.length; i++) {
        currentMatrix[i] = parseFloat(currentMatrix[i]);
    }
    
    selectedElement.setAttributeNS(null, "onmousemove", "moveElement(evt)");
    selectedElement.setAttributeNS(null, "onmouseout", "deselectElement(evt)");
    selectedElement.setAttributeNS(null, "onmouseup", "deselectElement(evt)");
    
}
    
function moveElement(evt) {
    var dx = evt.clientX - currentX;
    var dy = evt.clientY - currentY;
    currentMatrix[4] += dx;
    currentMatrix[5] += dy;
    
    selectedElement.setAttributeNS(null, "transform", "matrix(" + currentMatrix.join(' ') + ")");
    currentX = evt.clientX;
    currentY = evt.clientY;
    selectedElement.classList.add('draggable-selected');
}
    
function deselectElement(evt) {
    if(selectedElement != 0){
        selectedElement.removeAttributeNS(null, "onmousemove");
        selectedElement.removeAttributeNS(null, "onmouseout");
        selectedElement.removeAttributeNS(null, "onmouseup");
        selectedElement = 0;
    }
}

var transMatrix = [1,0,0,1,0,0];
        
function init(evt)
{
    if ( window.svgDocument == null )
    {
        svgDoc = evt.target.ownerDocument;

    }
    mapMatrix = svgDoc.getElementById("map-matrix");
    width  = evt.target.getAttributeNS(null, "width");
    height = evt.target.getAttributeNS(null, "height");
}

function zoom(scale){
    for (var i=0; i<transMatrix.length; i++)
    {
        transMatrix[i] *= scale;
    }
    transMatrix[4] += (1-scale)*width/2;
    transMatrix[5] += (1-scale)*height/2;        
    newMatrix = "matrix(" +  transMatrix.join(' ') + ")";
    mapMatrix.setAttributeNS(null, "transform", newMatrix);
}

function pan(dx, dy)
{
    
    transMatrix[4] += dx;
    transMatrix[5] += dy;
    
    newMatrix = "matrix(" +  transMatrix.join(' ') + ")";
    mapMatrix.setAttributeNS(null, "transform", newMatrix);
}

