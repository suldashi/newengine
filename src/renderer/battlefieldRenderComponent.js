const RenderComponent = require("./renderComponent");
const BattlefieldTileRenderComponent = require("./battlefieldTileRenderComponent");
const PIXI = require("./pixi");

class BattlefieldRenderComponent extends RenderComponent {
    constructor(battlefieldComponent,resources,stage) {
        super();
        this.battlefieldComponent = battlefieldComponent;
        this.subComponents = [];
        for(var i in this.battlefieldComponent.tiles) {
            for(var j in this.battlefieldComponent.tiles[i]) {
                let renderComponent = new BattlefieldTileRenderComponent(this.battlefieldComponent.tiles[i][j],i,j,resources,stage);
                this.subComponents.push(renderComponent);
            }
        }
    }

    update(camera) {
        for(var i in this.subComponents) {
            this.subComponents[i].update(camera);
        }
    }
}

module.exports = BattlefieldRenderComponent;