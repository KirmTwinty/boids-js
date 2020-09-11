class Vector {
    constructor(a = 0, b = 0) {
	if (typeof(a) == typeof(b)) {
	    if (a instanceof Point || a instanceof Vector) {
		this.x = a.x - b.x;
		this.y = a.y - b.y;
	    }else if (typeof(a) ==  "number"){
		this.x = a;
		this.y = b;
	    }else{
		console.warn('I don\'t know how to process type: '+ typeof(a));
	    }
	}else{
	    console.warn('Inputs must be of same type!')
	}
    }
    add(v2){
	this.x += v2.x;
	this.y += v2.y;
    }
    norm(){
	return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    magnitude(){
	return this.norm();
    }
    direction(){
	return Math.atan2(this.y, this.x) * 180 / Math.PI;
    }
    angle(){
	return this.direction();
    }
    setDirection(angle){
	var n = this.norm();
	this.x = Math.cos(angle * Math.PI / 180) * n;
	this.y = Math.sin(angle * Math.PI / 180) * n;
    }
    setMagnitude(a){
	var angle = this.direction();
	this.x = a * Math.cos(angle * Math.PI / 180);
	this.y = a * Math.sin(angle * Math.PI / 180);
    }
    add(v){
	if (typeof(v) == "number" ) {
	    this.x += v;
	    this.y += v;
	}else if(v instanceof Vector || v instanceof Point){
	    this.x += v.x;
	    this.y += v.y;
	}
    }
    substract(v){
	if (typeof(v) == "number" ) {
	    this.x -= v;
	    this.y -= v;
	}else if(v instanceof Vector || v instanceof Point){
	    this.x -= v.x;
	    this.y -= v.y;
	}
    }
    multiply(v){
	if (typeof(v) == "number" ) {
	    this.x *= v;
	    this.y *= v;
	}else if(v instanceof Vector || v instanceof Point){
	    this.x *= v.x;
	    this.y *= v.y;
	}
    }
    divide(v){
	if (typeof(v) == "number" ) {
	    if (v == 0) {
		console.warn('Cannot divide by zero!');
	    }else{
		this.x /= v;
		this.y /= v;
	    }
	}else if(v instanceof Vector || v instanceof Point){
	    if (v.x == 0 || v.y == 0) {
		console.warn('Cannot divide by zero!');
	    }else{
		this.x /= v.x;
		this.y /= v.y;
	    }
	}
    }
    

    copy(){
	return new Vector(this.x, this.y);
    }
    toString(){
	return '(' + this.x + ', ' + this.y + ')';
    }
    length(){
	return 2;
    }
}
