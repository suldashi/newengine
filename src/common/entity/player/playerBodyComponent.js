const eventBus = require("../../event");
const Vec2 = require("../../physics/vec2");

class PlayerBodyComponent {
    constructor(bodyComponent) {
        this.bodyComponent = bodyComponent;
        eventBus.on("playerMove",moveObj => {
            let direction = new Vec2(300,0).rotateDeg(moveObj.angle);
            this.bodyComponent.setVelocity(direction);
        });
        eventBus.on("playerStop",() => {
            this.bodyComponent.setVelocity(new Vec2(0,0));
        });
    }

    update() { }
}

module.exports = PlayerBodyComponent;