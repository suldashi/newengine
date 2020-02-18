const RenderComponent = require("./renderComponent");
const PIXI = require("./pixi");
const RenderUtils = require("./renderUtils");

class IsometricStaticRenderComponent extends RenderComponent {
    constructor(bodyComponent,resources,stage,spriteName) {
        super();
        this.bodyComponent = bodyComponent;
        this.resources = resources;
        this.stage = stage;
        this.scale = 1;
        this.spriteName = spriteName;
        this.isoPosition = this.bodyComponent.position.isometric();
        this.displaySprite(this.spriteName);
        
    }

    get zIndex() {
        if(this.spriteName==="floor_N" || this.spriteName==="switchFloorOff_N" || this.spriteName==="switchFloorOn_N" || this.spriteName==="pad") {
            return -100000000;
        }
        return this.bodyComponent.position.x + this.bodyComponent.position.y + this.bodyComponent.height;
    }

    update(camera) {
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

module.exports = IsometricStaticRenderComponent;