const Vec2 = require("./vec2");

class PolygonBodyComponent {
    constructor(points) {
        this.points = points;
        this.velocity = new Vec2(0,0);
    }

    setVelocity(velocity) {
        this.velocity = velocity.copy();
    }

    update(delta) {
        for(var i in this.points) {
            this.points[i].addToThis(this.velocity.scale(delta));
        }
    }
}

module.exports = PolygonBodyComponent;