const Vec2 = require("../physics/vec2");

class StaticCameraComponent {
    constructor() {
        this.cameraPosition = new Vec2(0,0);
    }

    negateAndMove(newPosition) {
        return this;
    }

    update() {
        return this;
    }
    
}

module.exports = StaticCameraComponent;