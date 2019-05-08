const PIXI = require("./pixi");
const CameraComponent = require("./cameraComponent");
const InverseIsometricBodyCameraComponent = require("./inverseIsometricBodyCameraComponent");
const IsometricStaticRenderComponent = require("./isometricStaticRenderComponent");
const IsometricPlayerRenderComponent = require("./isometricPlayerRenderComponent");
const TextComponent = require("./textComponent");
const Vec2 = require("../../common/physics/vec2");
const eventBus = require("../../common/event");

PIXI.utils.skipHello();
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

class PixiRenderer {
    constructor(resources) {
        this.parentElement = document.getElementById("root");
        this.width = 800;
        this.height = 480;
        this.app = new PIXI.Application({width: this.width, height: this.height});
        this.app.renderer.backgroundColor = 0xFFFFFF;
        this.graphics = new PIXI.Graphics();
        this.app.stage.addChild(this.graphics);
        this.app.stage.stageData = {
            width: this.width,
            height: this.height
        }
        this.activeCamera = new CameraComponent(0,0);
        this.screenCenter = new Vec2(this.width/2,this.height/2);
        this.renderComponents = [];
        this.activePlayer = null;
        this.parentElement.appendChild(this.app.view);
        this.resources = resources;
    }

    createStaticRenderComponent(bodyComponent) {
        let renderComponent = new IsometricStaticRenderComponent(bodyComponent);
        this.renderComponents.push(renderComponent);
        return renderComponent;
    }

    createPlayerRenderComponent(bodyComponent,playerComponent) {
        let renderComponent = new IsometricPlayerRenderComponent(bodyComponent,playerComponent,this.resources,this.app.stage);
        this.renderComponents.push(renderComponent);
        return renderComponent;
    }

    createTextComponent() {
        let renderComponent = new TextComponent(this.app.stage);
        this.renderComponents.push(renderComponent);
        return renderComponent;
    }

    createCameraComponent(bodyComponent) {
        return new InverseIsometricBodyCameraComponent(bodyComponent);
    }

    setActiveCamera(cameraComponent) {
        this.activeCamera = cameraComponent;
    }

    drawFrame() {
        requestAnimationFrame(() => {
            this.graphics.clear();
            this.activeCamera.update().negateAndMove(this.screenCenter);
            for(var i in this.renderComponents) {
                this.renderComponents[i].update(this.graphics,this.app.stage,this.activeCamera);
            }
        });   
    }
}

module.exports = PixiRenderer;