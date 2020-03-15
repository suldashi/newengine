const PlayerComponent = require("./player");
const PlayerBodyComponent = require("./player/playerBodyComponent");
const SwitchComponent = require("./switchComponent");
const BattlefieldComponent = require("./battle/battlefieldComponent");

class EntityFactory {
    createPlayerComponent(inputComponent) {
        let playerComponent = new PlayerComponent(inputComponent, this);
        return playerComponent;
    }

    createPlayerBodyComponent(bodyComponent) {
        let playerBodyComponent = new PlayerBodyComponent(bodyComponent, this);
        return playerBodyComponent;
    }

    createSwitchComponent(isOn) {
        let switchComponent = new SwitchComponent(isOn, this);
        return switchComponent;
    }

    createBattlefieldComponent() {
        let battlefieldComponent = new BattlefieldComponent();
        return battlefieldComponent;
    }

    update(entities, delta) {
        for(var i in entities) {
            entities[i].update(delta);
        }
    }
}

module.exports = EntityFactory;