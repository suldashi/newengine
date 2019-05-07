const eventBus = require("../../common/event");

class KeyboardInputProvider{
    constructor() {
        window.onkeydown = (event) => {
            switch(event.code) {
                case "KeyW": {
                    eventBus.emitEvent("newInputUp",true);
                    break;
                }
                case "KeyS": {
                    eventBus.emitEvent("newInputDown",true);
                    break;
                }
                case "KeyA": {
                    eventBus.emitEvent("newInputLeft",true);
                    break;
                }
                case "KeyD": {
                    eventBus.emitEvent("newInputRight",true);
                    break;
                }
            }
        };
        window.onkeyup = (event) => {
            switch(event.code) {
                case "KeyW": {
                    eventBus.emitEvent("newInputUp",false);
                    break;
                }
                case "KeyS": {
                    eventBus.emitEvent("newInputDown",false);
                    break;
                }
                case "KeyA": {
                    eventBus.emitEvent("newInputLeft",false);
                    break;
                }
                case "KeyD": {
                    eventBus.emitEvent("newInputRight",false);
                    break;
                }
            }
        };
    }
}

module.exports = KeyboardInputProvider;