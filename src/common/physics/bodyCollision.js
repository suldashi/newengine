class BodyCollision {
    constructor(firstBody,secondBody) {
        this.firstBody = firstBody;
        this.secondBody = secondBody;
        this.top = false;
        this.bottom = false;
        this.left = false;
        this.right = false;
        if(this.firstBody.position.x + this.firstBody.width/2 < this.secondBody.position.x + this.secondBody.width/2) {
            this.right = true;
        }
        else {
            this.left = true;
        }
        if(this.firstBody.position.y + this.firstBody.height/2 < this.secondBody.position.y && this.secondBody.height/2) {
            this.bottom = true;
        }
        else {
            this.top = true;
        }
    }
}

module.exports = BodyCollision;