const eventBus = require("../../event");
const IdleState = require("./playerState").IdleState;
const switchToIdleState = require("./playerState").switchToIdleState;
const switchToRunningState = require("./playerState").switchToRunningState;

class PlayerComponent {

    constructor(entityFactory) {
        this.entityFactory = entityFactory;
        this.playerState = new IdleState(this);
        eventBus.on("newPlayerControls",(inputs) => {
            this.handleInputs(inputs);
        });
    }

    get isOrientedLeft() {
        return this.playerState.isOrientedLeft; 
    }

    handleInputs(inputs) {
        if((inputs.up ^ inputs.down) || (inputs.left ^ inputs.right)) {
            this.setRunning();
            this.setAngle(this.getAngle(inputs));
            eventBus.emit("playerMove",{angle:this.playerState.angle});
        }
        else {
            this.setIdle();
            eventBus.emit("playerStop");
        }
    }

    setRunning() {
        switchToRunningState(this);
    }

    setIdle() {
        switchToIdleState(this);
    }

    setAngle(angle) {
        this.playerState.setAngle(angle);
    }

    getAngle(inputs) {
        if(inputs.up && inputs.left && !inputs.right) {
            return "W";
        }
        else if(inputs.up && inputs.right && !inputs.left) {
            return "N";
        }
        else if(inputs.down && inputs.right && !inputs.left) {
            return "E";
        }
        else if(inputs.down && inputs.left && !inputs.right) {
            return "S";
        }
        else if(inputs.down && !(inputs.left ^ inputs.right)) {
            return "SE";
        }
        else if(inputs.up && !(inputs.left ^ inputs.right)) {
            return "NW";
        }
        else if(inputs.left && !(inputs.up ^ inputs.down)) {
            return "SW";
        }
        else if(inputs.right && !(inputs.up ^ inputs.down)) {
            return "NE";
        }
    }

    update() {

    }

    
}

module.exports = PlayerComponent;