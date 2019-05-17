const RenderComponent = require("./renderComponent");
const PIXI = require("./pixi");
const Vec2 = require("../../common/physics/vec2");

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
        this.displaySprite(this.spriteName);
        
    }

    update(graphics,stage,camera) {
        if(this.spriteName !== this.playerComponent.playerState.sprite) {
            this.spriteName = this.playerComponent.playerState.sprite;
            this.destroyAnimation();
            this.displaySprite(this.spriteName);
        }
        if(this.reflected !== this.playerComponent.isOrientedLeft) {
            this.reflected = !this.reflected;
            this.sprite.scale.x*=-1;
        }
        let ap = this.bodyComponent.position.isometric();
        let ac = camera.cameraPosition.isometric();
        this.sprite.x = ap.x+ac.x;
        this.sprite.y = ap.y+ac.y;
    }

    playAnimation(animationTextures,animationSpeed) {
        this.sheet = this.resources.sheets[this.baseName];
        this.animation = animationTextures;
        this.sprite = new PIXI.AnimatedSprite(this.animation);
        this.sprite.anchor = new PIXI.ObservablePoint(null,null,0.5,0.5);
        this.sprite.scale.x = this.sprite.scale.y = this.scale;
        if(this.reflected) {
            this.sprite.scale.x*=-1;
        }
        this.sprite.animationSpeed = animationSpeed;
        this.sprite.play();
        this.stage.addChild(this.sprite);
    }

    destroyAnimation() {
        this.sprite.destroy();
    }

    displaySprite(spriteName) {
        this.baseName = this.getSheetBaseName(spriteName);
        this.sheet = this.resources.sheets[this.baseName];
        let isAnimation = typeof this.resources.animations[spriteName] !== "undefined";
        if(isAnimation) {
            this.playAnimation(this.sheet.sheet.animations[spriteName],this.resources.animations[spriteName].speed);
        }   
        else {
            this.playAnimation([this.resources.images[spriteName].texture],1);
        }
    }

    getSheetBaseName(spriteName) {
        return this.resources.animations[spriteName]?this.resources.animations[spriteName].baseName:this.resources.images[spriteName].baseName;
    }
}

module.exports = IsometricPlayerRenderComponent;