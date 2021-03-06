const RenderComponent = require("./renderComponent");

class IsometricPolygonRenderComponent extends RenderComponent {
    constructor(bodyComponent, graphics) {
        super();
        this.bodyComponent = bodyComponent;
        this.isoPosition = this.bodyComponent.position.isometric();
        this.color = 0xFF0000;
        this.zIndex = 0;
        this.graphics = graphics;
    }

    update(camera) {
        let cameraIso = camera.cameraPosition.isometric();
        this.isoPosition = this.bodyComponent.position.isometric();
        this.graphics.beginFill(this.color);
        let points = [];
        for(var i in this.bodyComponent.points) {
            let iso = this.bodyComponent.points[i].isometric();
            points.push(iso.x + cameraIso.x,iso.y + cameraIso.y - this.bodyComponent.height);
        }
        this.graphics.drawPolygon(points);
        this.graphics.endFill();
    }
}

module.exports = IsometricPolygonRenderComponent;