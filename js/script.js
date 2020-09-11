// http://www.vergenet.net/~conrad/boids/pseudocode.html

/* Parameters */
var repulsiveArea = 8;
var orientationArea = 20;
var attractiveArea = 80;


var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

var engine = new Engine(context);



var nuee = new Nuee(200);

repulsiveArea = Math.pow(repulsiveArea, 2);
attractiveArea = Math.pow(attractiveArea, 2);
// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resize_canvas, false);

function resize_canvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize_canvas();

engine.run();



