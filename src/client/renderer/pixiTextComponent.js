const RenderComponent = require("./pixiRenderComponent");
const PIXI = require("./pixi");
const event = require("../../common/event");

class PixiTextComponent extends RenderComponent {
    constructor(stage) {
        super();
        this.stage = stage;

        this.angle = 0;
        this.spinningText = new PIXI.Text(this.angle, {fill: '#000', align: 'right'});
        this.spinningText.anchor.x=1;
        this.spinningText.anchor.y=1;
        this.spinningText.position.x = stage.stageData.width;
        this.spinningText.position.y = stage.stageData.height;
        this.stage.addChild(this.spinningText);
        event.on("playerPosition",(playerData) => {
            this.spinningText.text = playerData.position.x.toFixed(2) + "  " + playerData.position.y.toFixed(2);
        });
    }

    update(graphics,stage,camera) {
        
    }
}

module.exports = PixiTextComponent;