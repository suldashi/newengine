const RenderComponent = require("./renderComponent");
const PIXI = require("./pixi");
const RenderUtils = require("./renderUtils");

class StaticRenderComponent extends RenderComponent {
    constructor(bodyComponent,resources,stage,spriteName) {
        super();
        this.bodyComponent = bodyComponent;
        this.resources = resources;
        this.stage = stage;
        this._scale = 1;
        this.spriteName = spriteName;
        this.displaySprite(this.spriteName);
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
        this.sprite.x = this.bodyComponent.position.x+ac.x;
        this.sprite.y = this.bodyComponent.position.y+ac.y;
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