const RenderComponent = require("./renderComponent");
const PIXI = require("./pixi");
const RenderUtils = require("./renderUtils");
const shader = require("./shader");

class IsometricPlayerRenderComponent extends RenderComponent {
    constructor(bodyComponent,playerComponent,resources,stage) {
        super();
        this.bodyComponent = bodyComponent;
        this.playerComponent = playerComponent;

        this.resources = resources;
        this.stage = stage;
        this.scale = 2;
        this.reflected = this.playerComponent.isOrientedLeft;
        this.spriteName = this.playerComponent.playerState.sprite;
        this.offsetX = 0;
        this.offsetY = 0;
        this.isoPosition = this.bodyComponent.position.isometric();
        this.displaySprite(this.spriteName);
        
    }

    get zIndex() {
        return this.bodyComponent.position.x + this.bodyComponent.position.y + this.bodyComponent.height;
    }

    update(camera) {
        if(this.spriteName !== this.playerComponent.playerState.sprite) {
            this.spriteName = this.playerComponent.playerState.sprite;
            this.destroyAnimation();
            this.displaySprite(this.spriteName);
        }
        if(this.reflected !== this.playerComponent.isOrientedLeft) {
            this.reflected = !this.reflected;
            this.sprite.scale.x*=-1;
        }
        this.isoPosition = this.bodyComponent.position.isometric();
        let ac = camera.cameraPosition.isometric();
        this.sprite.zIndex = this.zIndex;
        this.sprite.x = this.isoPosition.x + ac.x + this.offsetX;
        this.sprite.y = this.isoPosition.y + ac.y + this.offsetY - this.bodyComponent.height*RenderUtils.isoHeightAdjustmentFactor;
    }

    playAnimation(animationTextures,animationSpeed) {
        this.sheet = this.resources.sheets[this.baseName];
        this.animation = animationTextures;
        this.sprite = new PIXI.AnimatedSprite(this.animation);
        this.sprite.zIndex = this.zIndex;
        this.sprite.anchor = new PIXI.ObservablePoint(null,null,0.5,0.5);
        this.sprite.scale.x = this.sprite.scale.y = this.scale;
        this.sprite.filters = [shader];
        if(this.reflected) {
            this.sprite.scale.x*=-1;
        }
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
            this.offsetX = this.resources.animations[spriteName].offsetX;
            this.offsetY = this.resources.animations[spriteName].offsetY;
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

module.exports = IsometricPlayerRenderComponent;