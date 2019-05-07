const Vec2 = require("./vec2");
const GameObjectBody = require("./gameObjectBody");
const BodyCollision = require("./bodyCollision");
const Utils = require("../utils");

class Physics {

    constructor() {
        this.bodies = [];
        this.gravity = new Vec2(0,1000);
    }

    createBodyComponent(x,y,width,height) {
        let initialPos = new Vec2(x,y);
        let body = new GameObjectBody(initialPos,width,height);
        this.bodies.push(body);
        return body;
    }

    getAllIntersectingBodies() {
        let intersectingBodies = [];
        for(var i=0;i<this.bodies.length-1;i++) {
            for(var j=i+1;j<this.bodies.length;j++) {
                let collision = this.checkBodyCollision(this.bodies[i],this.bodies[j]);
                if(collision) {
                    intersectingBodies.push(collision);
                }
            }
        }
        return intersectingBodies;
    }

    checkBodyCollision(firstBody,secondBody) {
        if(Utils.float.LTEExact(firstBody.position.x,secondBody.position.x + secondBody.width) && 
            Utils.float.GTEExact(firstBody.position.x + firstBody.width, secondBody.position.x) &&
            Utils.float.LTEExact(firstBody.position.y, secondBody.position.y + secondBody.height) && 
            Utils.float.GTEExact(firstBody.position.y + firstBody.height, secondBody.position.y)) {
            let collision = new BodyCollision(firstBody,secondBody);
            return collision;
        }
        else {
            return false;
        }
    }

    update(delta) {
        for(var i in this.bodies) {
            this.bodies[i].update(delta);
        }
    }
}

module.exports = Physics;