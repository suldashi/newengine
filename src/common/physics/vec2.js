class Vec2 {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    //returns a new vector which is the sum of this vector and the input vector
    add(otherVec) {
        return new Vec2(this.x+otherVec.x,this.y+otherVec.y);
    }

    addX(scalar) {
        return new Vec2(this.x+scalar,this.y);
    }

    addY(scalar) {
        return new Vec2(this.x,this.y + scalar);
    }

    subtract(otherVec) {
        return new Vec2(this.x-otherVec.x,this.y-otherVec.y);
    }

    //adds the input vector to this one
    addToThis(otherVec) { 
        this.x+=otherVec.x;
        this.y+=otherVec.y;
    }

    //returns a new vector which is the negative of this one
    neg() {
        return this.scale(-1);
    }

    //negates this vector
    negThis() {
        this.x*=-1;
        this.y*=-1;
    }

    scale(amount) {
        return new Vec2(this.x*amount,this.y*amount);
    }

    copy() {
        return new Vec2(this.x,this.y);
    }

    magnitude() {
        return Math.sqrt((this.x*this.x)+(this.y*this.y));
    }

    normalize() {
        return new Vec2(this.x/this.magnitude(),this.y/this.magnitude());
    }

    dot(otherVector) {
        return this.x*otherVector.x+this.y*otherVector.y;
    }

    rotateDeg(angleInDeg) {
        let angleInRad = Math.PI*angleInDeg/180;
        return this.rotate(angleInRad);
    }

    matrix(x11,x21,x12,x22) {
        return new Vec2(this.x*x11+this.y*x21,this.x*x12+this.y*x22);
    }

    isometric() {
        return this.matrix(1,-1,0.5,0.5);
        // same thing as below
        //return this.rotateDeg(-45).matrix(1,0,0,0.5).scale(Math.sqrt(2));
    }

    inverseIsometric() {
        return this.matrix(0.5,1,-0.5,1);
        // same thing as below
        //return this.scale(1/Math.sqrt(2)).matrix(1,0,0,2).rotateDeg(45);
    }

    rotate(angleInRad) {
        return this.matrix(Math.cos(angleInRad),Math.sin(angleInRad),-Math.sin(angleInRad),Math.cos(angleInRad));
    }
}

module.exports = Vec2;