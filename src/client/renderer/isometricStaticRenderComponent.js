const RenderComponent = require("./renderComponent");
const Vec2 = require("../../common/physics/vec2");

class IsometricStaticRenderComponent extends RenderComponent {
    constructor(bodyComponent) {
        super();
        this.bodyComponent = bodyComponent;
        this.color = 0xFF0000;
    }

    update(graphics,stage,camera) {
        graphics.beginFill(this.color);    //black
        let isometric = this.bodyComponent.position.isometric();
        let w = this.bodyComponent.width;
        let h = this.bodyComponent.height;
        let augmented = camera.cameraPosition.isometric();
        let augmentedWidth = new Vec2(w,0).isometric();
        let augmentedHeight = new Vec2(0,h).isometric();
        let p1 = isometric.add(augmented);
        let p2 = p1.add(augmentedWidth);
        let p3 = p2.add(augmentedHeight);
        let p4 = p1.add(augmentedHeight);
        let points = [p1.x,p1.y,p2.x,p2.y,p3.x,p3.y,p4.x,p4.y];
        graphics.drawPolygon(points);
        graphics.endFill();
    }
}

module.exports = IsometricStaticRenderComponent;