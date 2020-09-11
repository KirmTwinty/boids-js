var fpsInterval, startTime, now, then, elapsed
then = Date.now();
startTime = then;

class Engine {
    constructor(context, nBirds = 200, areas = [20, 80, 2000], fps=60) {  
	this.context = context;
	this.areas = areas;
	this.nuee = new Nuee(nBirds);
	this.flockingPercentage = 0.5;
	this.centerOfMassArea = 2000;
	this.fps = fps;
	this.mousePoint = new Point();
    }
    static rule1_center_of_mass(r, b1, b2){	
	return [[r[0][0] + b2.position[0], r[0][1] + b2.position[1]], r[1] + 1];
    }

    static rule2_keep_small_distance(r, b1, b2){
	return [[r[0][0] - (b1.position[0] - b2.position[0]), r[0][1] - (b1.position[1] - b2.position[1])], 0];
    }

    static rule3_match_velocity(r, b1, b2){
	return [[r[0][0] + b2.velocity[0], r[0][1] + b2.velocity[1]], r[1] + 1];
    }
    static rule4_limit_velocity(b){
	
    }
    setFlockingPercentage(n){
	this.flockingPercentage = n /100;
    }
    setComArea(n){
	this.area[2] = n;
    }
    setFps(n){
	this.fps = n;
    }
    setMousePoint(p){
	this.mousePoint = p;
    }
    run(){
	requestAnimationFrame(this.run.bind(this));
	now = Date.now();
	elapsed = now - then;

	// if enough time has elapsed, draw the next frame
	if (elapsed > (1000 / this.fps)) {
            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            then = now - (elapsed % (1000 / this.fps));

            // Put your drawing code here
	    this.context.clearRect(0,0,window.innerWidth,window.innerHeight);
	    this.draw_mouse();
	    for (var iBird = 0; iBird < this.nuee.birds.length; iBird++) {

		this.nuee.birds[iBird].draw(this.context);
		this.apply_rules(iBird);
		// Know move the bird
		this.nuee.birds[iBird].move(this.mousePoint);
	    }	
	}

    }
    draw_mouse(){
	this.context.globalAlpha = 0.4;
	this.context.fillStyle = "#4287F5";
	this.context.beginPath()
	this.context.arc(this.mousePoint.x, this.mousePoint.y, 80/1.5, 0, 2 * Math.PI);
	this.context.fill();
	this.context.globalAlpha = 1.0;
    }
    apply_rules(iBird){
	var bird = this.nuee.birds[iBird];
	var centerOfMass = new Point();
	var centerOfMassCounter = 0;
	var velocity = 0;
	var velocityCounter = 0;
	var angleMean = new Point();
	var avoidOthers = new Vector();
	for (var jBird = 0; jBird < this.nuee.birds.length; jBird++) {
	    if (iBird != jBird) {
		var currentBird = this.nuee.birds[jBird];
		var d = Point.distance(bird.position, currentBird.position);
		if (d <= this.areas[0]) {
		    var pos = bird.position.copy();
		    pos.substract(currentBird.position);
		    avoidOthers.add(pos);
		}
		if (d <= this.areas[1]) {
		    velocity += currentBird.velocity();
		    velocityCounter++;
		    var angleV = new Vector(Math.sin(currentBird.angle() * Math.PI / 180), Math.cos(currentBird.angle() * Math.PI / 180));
		    angleMean.add(angleV);
		}
		if (d <= this.areas[2]) {
		     centerOfMass.add(currentBird.position);
		     centerOfMassCounter++;
		}

	    }
	}
	
	var v1 = new Vector();
	var theta1 = NaN;
	if (centerOfMassCounter > 0) {
	    centerOfMass.divide(centerOfMassCounter);
	    v1 = new Vector(centerOfMass, bird.position);
	    v1.divide(1000);
	}if (velocityCounter > 0) {
	    velocity /= velocityCounter;
	    angleMean.divide(velocityCounter);
	    theta1 = Math.atan2(angleMean.x, angleMean.y);
	}else{
	    velocity = bird.velocity();
	}

	var newVec = avoidOthers.copy();
	newVec.multiply(1.2);
	if (Math.random() < this.flockingPercentage) {
	    newVec.substract(v1); // break flocking 20% chance
	}else{
	    newVec.add(v1); // Flocking 80% chance
	}

	// Now we set the properties

	var oldVelocity = bird.velocity();

	bird.vector.add(newVec);
	if (!isNaN(theta1)) {
	    var theta2 = bird.angle() * Math.PI / 180;
	    theta1 = (Math.atan2((8 * Math.sin(theta2) + 2*Math.sin(theta1))/10, (8 * Math.cos(theta2) + 2*Math.cos(theta1))/10) % (2*Math.PI)) * 180 / Math.PI;
	    bird.setAngle(theta1);
	}
	velocity = (8*oldVelocity + 2*velocity) / 10;
	bird.setVelocity(velocity);

    }
}
