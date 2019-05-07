const PlayerComponent = require("./player");
const PlayerInputComponent = require("../input/playerInputComponent");
const PlayerBodyComponent = require("./player/playerBodyComponent");

class EntityFactory {
    constructor() {
        this.components = [];    
    }

    createPlayerComponent(inputComponent) {
        let playerComponent = new PlayerComponent(inputComponent);
        this.components.push(playerComponent);
        return playerComponent;
    }

    createPlayerInputComponent(playerComponent) {
        let playerInputComponent = new PlayerInputComponent(playerComponent);
        this.components.push(playerInputComponent);
        return playerInputComponent;
    }

    createPlayerBodyComponent(bodyComponent) {
        let playerBodyComponent = new PlayerBodyComponent(bodyComponent);
        this.components.push(playerBodyComponent);
        return playerBodyComponent;
    }

    update(delta) {
        for(var i in this.components) {
            this.components[i].update(delta);
        }
    }
}

module.exports = EntityFactory;