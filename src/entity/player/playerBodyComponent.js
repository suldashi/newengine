const eventBus = require("../../event");
const Vec2 = require("../../physics/vec2");

class PlayerBodyComponent {
    constructor(bodyComponent, entityFactory) {
        this.system = entityFactory;
        this.bodyComponent = bodyComponent;
        this.speed = 160;
        this.diagonalSpeed = this.speed/Math.sqrt(2);
        eventBus.on("playerMove",moveObj => {
            this.bodyComponent.setVelocity(this.getDirectionVector(moveObj.angle));
        });
        eventBus.on("playerStop",() => {
            this.bodyComponent.setVelocity(new Vec2(0,0));
        });
    }

    getDirectionVector(direction) {
        switch(direction) {
            case "N":
                return new Vec2(0,-this.speed);
            case "E":
                return new Vec2(this.speed,0);
            case "S":
                return new Vec2(0,this.speed);
            case "W":
                return new Vec2(-this.speed,0);
            case "NE":
                return new Vec2(this.diagonalSpeed,-this.diagonalSpeed);
            case "NW":
                return new Vec2(-this.diagonalSpeed,-this.diagonalSpeed);
            case "SE":
                return new Vec2(this.diagonalSpeed,this.diagonalSpeed);
            case "SW":
                return new Vec2(-this.diagonalSpeed,this.diagonalSpeed);
        }
    }

    update() { 
        eventBus.emit("playerPosition",{
            position:this.bodyComponent.position.copy()
        });
    }
}

module.exports = PlayerBodyComponent;