class Point {
    constructor(x = 0, y = 0) {
	this.x = x;
	this.y = y;
    }
    divide(p){
	if (typeof(p) == "number") {
	    if (p == 0) {
		console.warn('Cannot divide by zero!');
	    }else{
		this.x /= p;
		this.y /= p;
	    }
	}else if((p instanceof Point) || (p instanceof Vector)){
	    if (p.x == 0 || p.y == 0) {
		console.warn('Cannot divide by zero!');
	    }else{
		this.x /= p.x;
		this.y /= p.y;
	    }
	}else{
	    console.warn('You must divide a `scalar` or `Point` object! Nothing done.');
	}
    }
    add(p){
	if (typeof(p) == "number") {
	    this.x += p;
	    this.y += p;
	}else if((p instanceof Point) || (p instanceof Vector)){
	    this.x += p.x;
	    this.y += p.y;
	}else{
	    console.warn('You must add a `scalar` or `Point` object! Nothing done.');
	}
    }
    substract(p){
	if (typeof(p) == "number") {
	    this.x -= p;
	    this.y -= p;
	}else if((p instanceof Point) || (p instanceof Vector)){
	    this.x -= p.x;
	    this.y -= p.y;
	}else{
	    console.warn('You must substract a `scalar` or `Point` object! Nothing done.');
	}
    }
    multiply(p){
	if (typeof(p) == "number") {
	    this.x *= p;
	    this.y *= p;
	}else if((p instanceof Point) || (p instanceof Vector)){
	    this.x *= p.x;
	    this.y *= p.y;
	}else{
	    console.warn('You must multiply a `scalar` or `Point` object! Nothing done.');
	}
    }
    copy(){
	return new Point(this.x, this.y);
    }
    static distance(p1, p2){
	return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
    }
    toString(){
	return '(' + this.x + ', ' + this.y + ')';
    }

}
