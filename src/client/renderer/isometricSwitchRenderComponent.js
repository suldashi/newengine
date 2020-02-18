const RenderComponent = require("./renderComponent");
const PIXI = require("./pixi");
const RenderUtils = require("./renderUtils");

class IsometricSwitchRenderComponent extends RenderComponent {
    constructor(bodyComponent,switchComponent,resources,stage) {
        super();
        this.switchComponent = switchComponent;
        this.bodyComponent = bodyComponent;
        this.resources = resources;
        this.stage = stage;
        this.scale = 1;
        this.spriteName = switchComponent.spriteName;
        this.isoPosition = this.bodyComponent.position.isometric();
        this.displaySprite(this.spriteName);
        
    }

    get zIndex() {
        return -100000000;
    }

    update(camera) {
        if(this.spriteName !== this.switchComponent.spriteName) {
            this.spriteName = this.switchComponent.spriteName;
            this.destroyAnimation();
            this.displaySprite(this.spriteName);
        }
        this.isoPosition = this.bodyComponent.position.isometric();
        let ac = camera.cameraPosition.isometric();
        this.sprite.zIndex = this.zIndex;
        this.sprite.x = this.isoPosition.x+ac.x;
        this.sprite.y = this.isoPosition.y+ac.y - this.bodyComponent.height*RenderUtils.isoHeightAdjustmentFactor;
    }

    playAnimation(animationTextures,animationSpeed) {
        this.animation = animationTextures;
        this.sprite = new PIXI.AnimatedSprite(this.animation);
        this.sprite.updateAnchor = true;
        this.sprite.scale.x = this.sprite.scale.y = this.scale;
        this.sprite.animationSpeed = animationSpeed;
        this.sprite.play();
        this.stage.pixiStage.addChild(this.sprite);
    }

    destroyAnimation() {
        this.sprite.destroy();
    }

    displaySprite(spriteName) {
        this.playAnimation(this.resources.animations[spriteName],1/6);
    }
}

module.exports = IsometricSwitchRenderComponent;