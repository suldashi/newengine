const eventBus = require("../event");

class KeyboardInputProvider{
    constructor() {
        window.onkeydown = (event) => {
            switch(event.code) {
                case "KeyW": {
                    eventBus.emit("newInputUp",true);
                    break;
                }
                case "KeyS": {
                    eventBus.emit("newInputDown",true);
                    break;
                }
                case "KeyA": {
                    eventBus.emit("newInputLeft",true);
                    break;
                }
                case "KeyD": {
                    eventBus.emit("newInputRight",true);
                    break;
                }
            }
        };
        window.onkeyup = (event) => {
            switch(event.code) {
                case "KeyW": {
                    eventBus.emit("newInputUp",false);
                    break;
                }
                case "KeyS": {
                    eventBus.emit("newInputDown",false);
                    break;
                }
                case "KeyA": {
                    eventBus.emit("newInputLeft",false);
                    break;
                }
                case "KeyD": {
                    eventBus.emit("newInputRight",false);
                    break;
                }
            }
        };
    }
}

module.exports = KeyboardInputProvider;