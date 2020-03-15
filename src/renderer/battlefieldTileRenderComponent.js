const RenderComponent = require("./renderComponent");
const PIXI = require("./pixi");

class StaticRenderComponent extends RenderComponent {
    constructor(battlefieldTile, i,j,resources,stage) {
        super();
        this.resources = resources;
        this.stage = stage;
        this._scale = 4;
        this.xOffset = 320;
        this.yOffset = 348;
        this.tileXSize = 40*this._scale;
        this.tileYSize = 28*this._scale;
        this.i = i;
        this.j = j;
        this.battlefieldTile = battlefieldTile;
        this.displaySprite(this.battlefieldTile.isEnemy?"panel_1":"panel_2");
    }

    set scale(spriteScale) {
        this._scale = spriteScale;
        this.sprite.scale.x = this.sprite.scale.y = this._scale;
    }

    get zIndex() {
        return 0;
    }

    update(camera) {
        let ac = camera.cameraPosition;
        this.sprite.zIndex = this.zIndex;
        this.sprite.x = this.xOffset + this.i * this.tileXSize + ac.x;
        this.sprite.y = this.yOffset + this.j * this.tileYSize + ac.y;
    }

    playAnimation(animationTextures,animationSpeed) {
        this.animation = animationTextures;
        this.sprite = new PIXI.AnimatedSprite(this.animation);
        this.sprite.updateAnchor = true;
        this.sprite.scale.x = this.sprite.scale.y = this._scale;
        this.sprite.animationSpeed = animationSpeed;
        this.sprite.play();
        this.stage.pixiStage.addChild(this.sprite);
    }

    destroyAnimation() {
        this.sprite.destroy();
    }

    displaySprite(spriteName) {
        this.playAnimation(this.resources.animations[spriteName],1/10);
    }
}

module.exports = StaticRenderComponent;