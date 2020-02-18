const eventBus = require("../../event");
const Vec2 = require("../../physics/vec2");

class PlayerBodyComponent {
    constructor(polygonComponent) {
        this.polygonComponent = polygonComponent;
        this.speed = 150;
        this.diagonalSpeed = this.speed/Math.sqrt(2);
        eventBus.on("newPlayerControls",moveObj => {
            let angle = this.getAngle(moveObj);
            this.polygonComponent.setVelocity(this.getDirectionVector(angle));
        });
    }

    getAngle(controls) {
        let angle = "";
        if(controls.up && !controls.down) {
            angle += "N";
        }
        else if(controls.down && !controls.up){
            angle += "S";
        }
        if(controls.left && !controls.right) {
            angle+="W";
        }
        else if(controls.right && !controls.left) {
            angle+="E";
        }
        return angle;
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
            case "":
                return new Vec2(0,0);
        }
    }

    update() { 

    }
}

module.exports = PlayerBodyComponent;