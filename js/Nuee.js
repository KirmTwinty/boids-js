const MARGIN_X = 60;
const MARGIN_Y = 60;
class Nuee {
    constructor(nBirds = 100, width = window.innerWidth, height = window.innerHeight, color = "#ca2a36"){
	this.nBirds = nBirds;
	this.width = width;
	this.height = height;
	this.color = color;
	this.birds = this.generate_birds();
    }

    generate_birds(){
	var l = []
	for (var iBird = 0; iBird < this.nBirds; iBird++) {
	    var pos = [random_int(MARGIN_X, this.width-MARGIN_X), 
		       random_int(MARGIN_Y, this.height-MARGIN_Y)];
	    var dir = random_int(0,360);
	    var velocity = random_float(1,10);
	    l.push(new Bird(pos, dir, velocity, this.color));
	}
	return(l)
    }
    set_number_birds(n = 100){
	this.nBirds = this.birds.length;
	if (n > 1) {
	    if (n < this.nBirds) {
		this.remove_bird(this.nBirds - n);
		this.nBirds = this.birds.length;
	    }else if(n > this.nBirds){
		this.add_bird(n - this.nBirds);
		this.nBirds = this.birds.length;
	    }
	}else{
	    console.warn(n + " should be greater than 1.");
	}
    }
    add_bird(n = 1){
	for (var i = 0; i < n; i++) {
	    var pos = [random_int(MARGIN_X, this.width-MARGIN_X), 
		       random_int(MARGIN_Y, this.height-MARGIN_Y)];
	    var dir = random_int(0,360);
	    var velocity = random_float(1,20);
	    this.birds.push(new Bird(pos, dir, velocity, this.color));
	}
    }
    remove_bird(n = 1){
	for (var i = 0; i < n; i++) {
	    this.birds.pop();
	}
    }
}

