const Vec2 = require("./vec2");

class PolygonRotationComponent {
    constructor(polygonComponent) {
        this.polygonComponent = polygonComponent;
        this.centerPoint = this.calculateAveragePoint(this.polygonComponent.points);
        this.angularVelocity = Math.PI/4;
    }

    calculateAveragePoint(points) {
        let averageX = 0;
        let averageY = 0;
        for(var i in points) {
            averageX+=points[i].x;
            averageY+=points[i].y;
        }
        averageX/=points.length;
        averageY/=points.length;
        return new Vec2(averageX,averageY);
    }

    update(delta) {
        this.centerPoint = this.calculateAveragePoint(this.polygonComponent.points);
        for(var i in this.polygonComponent.points) {
            this.polygonComponent.points[i] = this.polygonComponent.points[i].subtract(this.centerPoint).rotate(this.angularVelocity*delta).add(this.centerPoint);
        }
    }
}

module.exports = PolygonRotationComponent;