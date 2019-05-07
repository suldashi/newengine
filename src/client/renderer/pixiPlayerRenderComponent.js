const RenderComponent = require("./pixiRenderComponent");
const PIXI = require("./pixi");

class PixiPlayerRenderComponent extends RenderComponent {
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
        this.sprite.x = this.bodyComponent.position.x+camera.cameraPosition.x+this.bodyComponent.width/2;
        this.sprite.y = this.bodyComponent.position.y+camera.cameraPosition.y+this.bodyComponent.height/2;
    }

    playAnimation(spriteName,animationTextures,animationSpeed) {
        this.sheet = this.resources.sheets[this.baseName];
        this.animation = animationTextures;
        console.log(this.animation);
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
            this.playAnimation(this.spriteName,this.sheet.sheet.animations[spriteName],this.resources.animations[spriteName].speed);
        }   
        else {
            this.playAnimation(this.spriteName,[this.resources.images[spriteName].texture],1);
        }
    }

    getSheetBaseName(spriteName) {
        return this.resources.animations[spriteName]?this.resources.animations[spriteName].baseName:this.resources.images[spriteName].baseName;
    }
}

module.exports = PixiPlayerRenderComponent;