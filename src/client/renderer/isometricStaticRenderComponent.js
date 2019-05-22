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
        this.offsetX = 0;
        this.offsetY = 0;
        this.isoPosition = this.bodyComponent.position.isometric();
        this.displaySprite(this.spriteName);
        
    }

    get zIndex() {
        if(this.spriteName==="floor_N" || this.spriteName==="switchFloorOff_N") {
            return -100000000;
        }
        return this.bodyComponent.position.x + this.bodyComponent.position.y + this.bodyComponent.height;
    }

    update(camera) {
        this.isoPosition = this.bodyComponent.position.isometric();
        let ac = camera.cameraPosition.isometric();
        this.sprite.zIndex = this.zIndex;
        this.sprite.x = this.isoPosition.x+ac.x + this.offsetX;
        this.sprite.y = this.isoPosition.y+ac.y + this.offsetY - this.bodyComponent.height*RenderUtils.isoHeightAdjustmentFactor;
    }

    playAnimation(animationTextures,animationSpeed) {
        this.sheet = this.resources.sheets[this.baseName];
        this.animation = animationTextures;
        this.sprite = new PIXI.AnimatedSprite(this.animation);
        this.sprite.anchor = new PIXI.ObservablePoint(null,null,0.5,0.5);
        this.sprite.scale.x = this.sprite.scale.y = this.scale;
        this.sprite.animationSpeed = animationSpeed;
        this.sprite.play();
        
        this.stage.pixiStage.addChild(this.sprite);
    }

    destroyAnimation() {
        this.sprite.destroy();
    }

    displaySprite(spriteName) {
        this.baseName = this.getSheetBaseName(spriteName);
        this.sheet = this.resources.sheets[this.baseName];
        let isAnimation = typeof this.resources.animations[spriteName] !== "undefined";
        if(isAnimation) {
            this.offsetX = this.resources.animations[this.baseName].offsetX;
            this.offsetY = this.resources.animations[this.baseName].offsetY;
            this.playAnimation(this.sheet.sheet.animations[spriteName],this.resources.animations[spriteName].speed);
        }   
        else {
            this.offsetX = this.resources.images[spriteName].offsetX;
            this.offsetY = this.resources.images[spriteName].offsetY;
            this.playAnimation([this.resources.images[spriteName].texture],1);
        }
    }

    getSheetBaseName(spriteName) {
        return this.resources.animations[spriteName]?this.resources.animations[spriteName].baseName:this.resources.images[spriteName].baseName;
    }
}

module.exports = IsometricStaticRenderComponent;