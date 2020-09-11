var slider = document.getElementById("birdsNumber");
var sliderLabel = document.getElementById("birdsNumberLabel");
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    sliderLabel.setAttribute('data', "Number of birds: " + this.value);
    engine.nuee.set_number_birds(this.value);
} 
var sliderFlocking = document.getElementById("flocking");
var sliderFlockingLabel = document.getElementById("flockingLabel");
// Update the current sliderFlocking value (each time you drag the sliderFlocking handle)
sliderFlocking.oninput = function() {
    sliderFlockingLabel.setAttribute('data', "Flocking percentage: " + this.value);
    engine.setFlockingPercentage(100-this.value);
} 

var sliderCom = document.getElementById("com");
var sliderComLabel = document.getElementById("comLabel");
// Update the current sliderCom value (each time you drag the sliderCom handle)
sliderCom.oninput = function() {
    sliderComLabel.setAttribute('data', "Center of mass area: " + this.value);
    engine.setComArea(this.value);
} 

var sliderFps = document.getElementById("fpsNumber");
var sliderFpsLabel = document.getElementById("fpsNumberLabel");
// Update the current sliderFps value (each time you drag the sliderFps handle)
sliderFps.oninput = function() {
    sliderFpsLabel.setAttribute('data', "Number of fps: " + this.value);
    engine.setFps(this.value);
} 
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
	scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
	scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

    return {
        x: scaleX * (evt.clientX - rect.left),
        y: scaleY * (evt.clientY - rect.top)
    };
}
canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    var mousePoint = new Point(mousePos.x, mousePos.y);
    engine.setMousePoint(mousePoint);
}, false);

