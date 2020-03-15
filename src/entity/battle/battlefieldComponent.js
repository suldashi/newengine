const BattlefieldTileComponent = require("./battlefieldTileComponent");

class BattlefieldComponent {
    constructor() {
        this.tiles = [];
        for(var i = 0; i < 8; i++) {
            this.tiles[i] = [];
            for(var j = 0; j < 4; j++) {
                this.tiles[i][j] = new BattlefieldTileComponent(i>3);
            }
        }
    }
}

module.exports = BattlefieldComponent;