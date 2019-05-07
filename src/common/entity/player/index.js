const eventBus = require("../../event");
const IdleState = require("./playerState").IdleState;
const switchToIdleState = require("./playerState").switchToIdleState;
const switchToRunningState = require("./playerState").switchToRunningState;

class PlayerComponent {

    constructor() {
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
            eventBus.emitEvent("playerMove",{angle:this.playerState.angle});
        }
        else {
            this.setIdle();
            eventBus.emitEvent("playerStop");
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
            return 135;
        }
        else if(inputs.up && inputs.right && !inputs.left) {
            return 45;
        }
        else if(inputs.down && inputs.right && !inputs.left) {
            return 315;
        }
        else if(inputs.down && inputs.left && !inputs.right) {
            return 225;
        }
        else if(inputs.down && !(inputs.left ^ inputs.right)) {
            return 270;
        }
        else if(inputs.up && !(inputs.left ^ inputs.right)) {
            return 90;
        }
        else if(inputs.left && !(inputs.up ^ inputs.down)) {
            return 180;
        }
        else if(inputs.right && !(inputs.up ^ inputs.down)) {
            return 0;
        }
    }

    update() {

    }

    
}

module.exports = PlayerComponent;