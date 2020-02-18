const RenderComponent = require("./renderComponent");

class PolygonRenderComponent extends RenderComponent {
    constructor(polygonComponent) {
        super();
        this.polygonComponent = polygonComponent;
        this.color = 0xFF0000;
    }

    update(graphics,stage,camera) {
        graphics.beginFill(this.color);    //black
        let points = [];
        for(var i in this.polygonComponent.points) {
            points.push(this.polygonComponent.points[i].x,this.polygonComponent.points[i].y)
        }
        graphics.drawPolygon(points);
        graphics.endFill();
    }
}

module.exports = PolygonRenderComponent;