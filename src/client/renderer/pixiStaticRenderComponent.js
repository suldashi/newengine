const PixiRenderComponent = require("./pixiRenderComponent");

class PixiStaticRenderComponent extends PixiRenderComponent {
    constructor(bodyComponent) {
        super();
        this.bodyComponent = bodyComponent;
    }

    update(graphics,stage,camera) {
        graphics.beginFill(0x0);    //black
        graphics.drawRect(this.bodyComponent.position.x+camera.cameraPosition.x, this.bodyComponent.position.y+camera.cameraPosition.y, this.bodyComponent.width, this.bodyComponent.height);
    }
}

module.exports = PixiStaticRenderComponent;