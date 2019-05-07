const eventBus = require("../event");

class PlayerInputComponent {
    constructor() {
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        eventBus.on("newInputUp",this.updateUp.bind(this));
        eventBus.on("newInputDown",this.updateDown.bind(this));
        eventBus.on("newInputLeft",this.updateLeft.bind(this));
        eventBus.on("newInputRight",this.updateRight.bind(this));
    }

    updateUp(newUp) {
        this.up = newUp;
        eventBus.emitEvent("newPlayerControls",this.getInputs());
    }

    updateDown(newDown) {
        this.down = newDown;
        eventBus.emitEvent("newPlayerControls",this.getInputs());
    }

    updateLeft(newLeft) {
        this.left = newLeft;
        eventBus.emitEvent("newPlayerControls",this.getInputs());
    }

    updateRight(newRight) {
        this.right = newRight;
        eventBus.emitEvent("newPlayerControls",this.getInputs());
    }

    getInputs() {
        let inputs = {
            up: this.up,
            down: this.down,
            left: this.left,
            right: this.right,
        };
        return inputs;
    }

    update() { }
}

module.exports = PlayerInputComponent;