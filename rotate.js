var minWidth = 60;
var minHeight = 40;

// Thresholds
var MARGINS = 4;

// End of what's configurable.
var clicked = null;
var onRightEdge, onBottomEdge, onLeftEdge, onTopEdge;

var b, x, y;

var redraw = false;

var pane = document.getElementById('pane');

var e;

// Mouse events
pane.addEventListener('mousedown', onMouseDown);
document.addEventListener('mousemove', onMove);
document.addEventListener('mouseup', onUp);

// Touch events 
pane.addEventListener('touchstart', onTouchDown);
document.addEventListener('touchmove', onTouchMove);
document.addEventListener('touchend', onTouchEnd);


function onTouchDown(e) {
  onDown(e.touches[0]);
  e.preventDefault();
}

function onTouchMove(e) {
  onMove(e.touches[0]);     
}

function onTouchEnd(e) {
  if (e.touches.length ==0) onUp(e.changedTouches[0]);
}

function onMouseDown(e) {
  onDown(e);
  e.preventDefault();
}

function onMove(ee) {
  calc(ee);
  e = ee;
  redraw = true;
}

function onUp(e) {
  calc(e);
  clicked = null;

}

function onDown(e) {
  calc(e);

  var isResizing = onRightEdge || onBottomEdge || onTopEdge || onLeftEdge;
  console.log("isResizing: " + isResizing);

  clicked = {
	x: x,
	y: y,
	cx: e.clientX,
	cy: e.clientY,
	w: b.width,
	h: b.height,
	isResizing: isResizing,
	onTopEdge: onTopEdge,
	onLeftEdge: onLeftEdge,
	onRightEdge: onRightEdge,
	onBottomEdge: onBottomEdge
  };
  
  console.log("clicked:" + clicked.x);
}


function animate() {

  requestAnimationFrame(animate);

  if (!redraw) return;

  redraw = false;

  if (clicked && clicked.isResizing) {

	if (clicked.onRightEdge) pane.style.width = Math.max(x, minWidth) + 'px';
	if (clicked.onBottomEdge) pane.style.height = Math.max(y, minHeight) + 'px';

	if (clicked.onLeftEdge) {
	  var currentWidth = Math.max(clicked.cx - e.clientX  + clicked.w, minWidth);
	  if (currentWidth > minWidth) {
		pane.style.width = currentWidth + 'px';
		pane.style.left = e.clientX + 'px'; 
	  }
	}

	if (clicked.onTopEdge) {
	  var currentHeight = Math.max(clicked.cy - e.clientY  + clicked.h, minHeight);
	  if (currentHeight > minHeight) {
		pane.style.height = currentHeight + 'px';
		pane.style.top = e.clientY + 'px';  
	  }
	}


	return;
  }

  // This code executes when mouse moves without clicking

  // style cursor
  if (onRightEdge && onBottomEdge || onLeftEdge && onTopEdge) {
	pane.style.cursor = 'nwse-resize';
  } else if (onRightEdge && onTopEdge || onBottomEdge && onLeftEdge) {
	pane.style.cursor = 'nesw-resize';
  } else if (onRightEdge || onLeftEdge) {
	pane.style.cursor = 'ew-resize';
  } else if (onBottomEdge || onTopEdge) {
	pane.style.cursor = 'ns-resize';
  } else {
	pane.style.cursor = 'default';
  }
}

function calc(e) {
  b = pane.getBoundingClientRect();
  x = e.clientX - b.left;
  y = e.clientY - b.top;

  onTopEdge = y < MARGINS;
  onLeftEdge = x < MARGINS;
  onRightEdge = x >= b.width - MARGINS;
  onBottomEdge = y >= b.height - MARGINS;
  
  console.log("e.clientX : " + e.clientX);
  console.log("e.clientY: " + e.clientY);
  console.log("b.left: " + b.left);
  console.log("b.top: " + b.top);
  
  console.log("b: " + b);
  console.log("x: " + x);
  console.log("y: " + y);
  console.log("onTopEdge: " + onTopEdge);
  console.log("onLeftEdge: " + onLeftEdge);
  console.log("onRightEdge: " + onRightEdge);
  console.log("onBottomEdge: " + onBottomEdge);
  console.log("****************");
}

animate();