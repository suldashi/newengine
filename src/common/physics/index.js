const Vec2 = require("./vec2");
const GameObjectBody = require("./gameObjectBody");
const PolygonBodyComponent = require("./polygonBodyComponent");
const PolygonRotationComponent = require("./polygonRotationComponent");
const checkCollision = require("./satCollisionChecker");

class Physics {

    constructor() {
        this.bodies = [];
        this.collidingBodies = [];
    }

    createBodyComponent(x,y,width,height) {
        let initialPos = new Vec2(x,y);
        let body = new GameObjectBody(initialPos,width,height);
        this.bodies.push(body);
        this.collidingBodies.push(body);
        return body;
    }

    createTriangleComponent(x,y) {
        let body = new PolygonBodyComponent([new Vec2(x,y),new Vec2(x+200,y),new Vec2(x+100,y+141)]);
        this.bodies.push(body);
        this.collidingBodies.push(body); 
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