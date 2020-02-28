const PlayerComponent = require("./player");
const PlayerBodyComponent = require("./player/playerBodyComponent");
const SwitchComponent = require("./switchComponent");

class EntityFactory {
    constructor() {
        this.components = [];    
    }

    createPlayerComponent(inputComponent) {
        let playerComponent = new PlayerComponent(inputComponent, this);
        this.components.push(playerComponent);
        return playerComponent;
    }

    createPlayerBodyComponent(bodyComponent) {
        let playerBodyComponent = new PlayerBodyComponent(bodyComponent, this);
        this.components.push(playerBodyComponent);
        return playerBodyComponent;
    }

    createSwitchComponent(isOn) {
        let switchComponent = new SwitchComponent(isOn, this);
        return switchComponent;
    }

    update(entities, delta) {
        for(var i in entities) {
            entities[i].update(delta);
        }
    }
}

module.exports = EntityFactory;