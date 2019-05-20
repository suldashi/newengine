const Vec2 = require("../../common/physics/vec2");

class InverseIsometricBodyCameraComponent {
    constructor(bodyComponent) {
        this.bodyComponent = bodyComponent;
        this.cameraPosition = this.bodyComponent.position.copy();
    }

    negateAndMove(newPosition) {
        this.cameraPosition = this.cameraPosition.neg().add(newPosition.inverseIsometric()).add(new Vec2(0,this.bodyComponent.height).inverseIsometric());
        return this;
    }

    update() {
        this.cameraPosition = this.bodyComponent.position.copy();
        return this;
    }
    
}

module.exports = InverseIsometricBodyCameraComponent;