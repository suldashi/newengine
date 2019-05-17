const RenderComponent = require("./renderComponent");

class IsometricPolygonRenderComponent extends RenderComponent {
    constructor(polygonComponent) {
        super();
        this.polygonComponent = polygonComponent;
        this.color = 0xFF0000;
    }

    update(graphics,stage,camera) {
        let cameraIso = camera.cameraPosition.isometric();
        graphics.beginFill(this.color);    //black
        let points = [];
        for(var i in this.polygonComponent.points) {
            let iso = this.polygonComponent.points[i].isometric();
            points.push(iso.x + cameraIso.x,iso.y + cameraIso.y);
        }
        graphics.drawPolygon(points);
        graphics.endFill();
    }
}

module.exports = IsometricPolygonRenderComponent;