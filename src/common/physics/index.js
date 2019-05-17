const Vec2 = require("./vec2");
const PolygonBodyComponent = require("./polygonBodyComponent");
const PointBodyComponent = require("./pointBodyComponent");
const PolygonRotationComponent = require("./polygonRotationComponent");
const checkCollision = require("./satCollisionChecker");

class Physics {

    constructor() {
        this.bodies = [];
        this.collidingBodies = [];
    }

    createBodyComponent(x,y,width,height) {
        let body = new PolygonBodyComponent([new Vec2(x,y),new Vec2(x+width,y),new Vec2(x+width,y+height),new Vec2(x,y+height)]);
        this.bodies.push(body);
        //this.collidingBodies.push(body);
        return body;
    }

    createPointBodyComponent(x,y) {
        let body = new PointBodyComponent(x,y);
        this.bodies.push(body);
        //this.collidingBodies.push(body);
        return body;
    }

    createTriangleComponent(x,y,h) {
        let hRot = new Vec2(0,-h);
        let center = new Vec2(x,y);
        let body = new PolygonBodyComponent([center.add(hRot),center.add(hRot.rotateDeg(120)),center.add(hRot.rotateDeg(240))]);
        this.bodies.push(body);
        //this.collidingBodies.push(body); 
        return body;
    }

    createPolygonRotationComponent(polygonComponent) {
        let polygonRotationComponent = new PolygonRotationComponent(polygonComponent);
        this.bodies.push(polygonRotationComponent);
        return polygonRotationComponent;
    }

    checkCollisionPairs() {
        for(var i=0;i<this.collidingBodies.length-1;i++) {
            for(var j=i+1;j<this.collidingBodies.length;j++) {
                let collision = checkCollision(this.collidingBodies[i],this.collidingBodies[j]);
                if(collision) {
                    collision = collision.scale(-1);
                    this.collidingBodies[i].points = this.collidingBodies[i].points.map(x => x.add(collision));
                }
            }
        }
    }

    update(delta) {
        for(var i in this.bodies) {
            this.bodies[i].update(delta);
        }
        this.checkCollisionPairs();
    }
}

module.exports = Physics;