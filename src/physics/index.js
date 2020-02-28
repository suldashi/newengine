const Vec2 = require("./vec2");
const PolygonBodyComponent = require("./polygonBodyComponent");
const PointBodyComponent = require("./pointBodyComponent");

class Physics {

    constructor() {
        this.bodies = [];
    }

    createBodyComponent(x,y,width,height) {
        let hw = width/2;
        let hh = height/2;
        let body = new PolygonBodyComponent([new Vec2(x-hw,y-hh),new Vec2(x+hw,y-hh),new Vec2(x+hw,y+hh),new Vec2(x-hw,y+hh)], this);
        this.bodies.push(body);
        return body;
    }

    createPointBodyComponent(x,y) {
        let body = new PointBodyComponent(x,y, this);
        this.bodies.push(body);
        return body;
    }

    update(physicsComponents, delta) {
        for(var i in physicsComponents) {
            physicsComponents[i].update(delta);
        }
    }
}

module.exports = Physics;