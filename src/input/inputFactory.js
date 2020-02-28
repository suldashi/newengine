const PlayerInputComponent = require("./playerInputComponent");

class InputFactory {
    constructor() {
        this.components = [];    
    }

    createPlayerInputComponent() {
        let playerInputComponent = new PlayerInputComponent(this);
        this.components.push(playerInputComponent);
        return playerInputComponent;
    }

    update(inputComponents, delta) {
        for(var i in inputComponents) {
            inputComponents[i].update(delta);
        }
    }
}

module.exports = InputFactory;