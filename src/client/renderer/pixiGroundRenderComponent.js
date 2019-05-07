const Vec2 = require("../../common/physics/vec2")
const RenderComponent = require("./pixiRenderComponent");
const PIXI = require("./pixi");

class PixiGroundRenderComponent extends RenderComponent {
    constructor(groundObject,resources,stage) {
        super(groundObject);
    }

    update(graphics,stage,camera) {
        let startPoint = this.gameObject.startPoint.add(camera.cameraPosition);
        let endPoint = this.gameObject.endPoint.add(camera.cameraPosition);
        graphics.lineStyle(3, 0xFF0000)
        .moveTo(startPoint.x, startPoint.y)
        .lineTo(endPoint.x, endPoint.y)
        .lineStyle(0);
        /* graphics.beginFill(0x0);    //black
        graphics.drawRect(this.gameObject.body.position.x+camera.cameraPosition.x, this.gameObject.body.position.y+camera.cameraPosition.y, this.gameObject.body.width, this.gameObject.body.height);
        */
    }
}

module.exports = PixiGroundRenderComponent;