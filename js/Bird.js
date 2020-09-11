const BIRD_WIDTH = 20;
const BIRD_HEIGHT = 15;
const MAX_VELOCITY = 20;
class Bird {
    constructor(position, angle, velocity, color) {
	this.position = new Point(position[0], position[1]);
	this.vector = new Vector();
	this.vector.setMagnitude(velocity);
	this.vector.setDirection(angle);
	this.color = color;
	this.previousVector = this.vector;
    };
    
    velocity(){
	return this.vector.magnitude();
    }
    angle(){
	return this.vector.angle();
    }
    setAngle(angle){
	this.vector.setDirection(angle);
    }
    setVelocity(velocity){
	this.vector.setMagnitude(velocity);
    }
    
    draw(context){
	context.fillStyle = this.color;
	context.save();
	context.translate(this.position.x-5, this.position.y-Math.ceil(BIRD_HEIGHT/2));
	context.rotate(this.angle() * Math.PI / 180);
	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(BIRD_WIDTH, Math.ceil(BIRD_HEIGHT/2));
	context.lineTo(0, BIRD_HEIGHT);
	context.lineTo(5, Math.ceil(BIRD_HEIGHT/2));
	context.lineTo(0,0);
	context.fill();
	context.restore();
    }
    move(mousePoint){
	// Perform the movement
	// Check for max velocity
	if (this.velocity >= MAX_VELOCITY) {
	    this.setVelocity(MAX_VELOCITY);
	}
	// Check for boundaries
	this.checkBoundaries();
	// Check for mouse avoidance
	this.checkMouse(mousePoint);

	this.position.add(this.vector);
	// Smooth movements
	// var error = this.vector.copy();
	// if (Math.abs(error.angle() - this.previousVector.angle()) > 180 / 10) {
	//     if (error.angle() > this.previousVector.angle()) {
	// 	error.setDirection(this.previousVector.angle() + 180/10);
	//     }else{
	// 	error.setDirection(this.previousVector.angle() - 180/10);
	//     }
	// }
	// error.setMagnitude(this.vector.magnitude());
	// error.multiply(0.5); // Gain
	// this.vector.add(this.position);
	// this.position.add(error);

	// this.vector.substract(this.position);
	// this.previousVector = this.vector;

    }
    checkMouse(mousePoint){
	var newX = this.position.x + this.vector.x;
	var newY = this.position.y + this.vector.y;
	var newPoint = new Point(newX, newY);
	if (Point.distance(newPoint, mousePoint) < 80) {
	    if (newPoint.x > mousePoint.x) {
		var newVec = this.vector.copy();
		newVec.x += 20;
		newVec.setMagnitude(this.vector.magnitude());
		this.vector = newVec.copy();
	    }else{
		var newVec = this.vector.copy();
		newVec.x -= 20;
		newVec.setMagnitude(this.vector.magnitude());
		this.vector = newVec.copy();
	    }
	    if (newPoint.y > mousePoint.y) {
		var newVec = this.vector.copy();
		newVec.y += 20;
		newVec.setMagnitude(this.vector.magnitude());
		this.vector = newVec.copy();
	    }else{
		var newVec = this.vector.copy();
		newVec.y -= 20;
		newVec.setMagnitude(this.vector.magnitude());
		this.vector = newVec.copy();
	    }
	}
    }
    checkBoundaries(){
	if (this.position.x + this.vector.x > window.innerWidth - 30) {
	    var newVec = this.vector.copy();
	    newVec.x -= 10;
	    newVec.setMagnitude(this.vector.magnitude());
	    this.vector = newVec.copy();
	}else if (this.position.x + this.vector.x < 30) {
	    var newVec = this.vector.copy();
	    newVec.x += 10;
	    newVec.setMagnitude(this.vector.magnitude());
	    this.vector = newVec.copy();
	}
	if (this.position.y + this.vector.y > window.innerHeight - 30) {
	    var newVec = this.vector.copy();
	    newVec.y -= 10;
	    newVec.setMagnitude(this.vector.magnitude());
	    this.vector = newVec.copy();
	}else if (this.position.y + this.vector.y < 30) {
	    var newVec = this.vector.copy();
	    newVec.y += 10;
	    newVec.setMagnitude(this.vector.magnitude());
	    this.vector = newVec.copy();
	}
    }
    toString(){
	return 'Bird: ' + this.position.toString() + ', ' + this.vector.toString();
    }
}
