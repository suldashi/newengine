const PIXI = require("./pixi");
const CameraComponent = require("./cameraComponent");
const BodyCameraComponent = require("./bodyCameraComponent");
const PixiStaticRenderComponent = require("./pixiStaticRenderComponent");
const PixiPlayerRenderComponent = require("./pixiPlayerRenderComponent");
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
        this.activeCamera = new CameraComponent(0,0);
        this.screenCenter = new Vec2(this.width/2,this.height/2);
        this.renderComponents = [];
        this.activePlayer = null;
        this.parentElement.appendChild(this.app.view);
        this.resources = resources;
    }

    createStaticRenderComponent(bodyComponent) {
        let renderComponent = new PixiStaticRenderComponent(bodyComponent);
        this.renderComponents.push(renderComponent);
        return renderComponent;
    }

    createPlayerRenderComponent(bodyComponent,playerComponent) {
        let renderComponent = new PixiPlayerRenderComponent(bodyComponent,playerComponent,this.resources,this.app.stage);
        this.renderComponents.push(renderComponent);
        return renderComponent;
    }

    createCameraComponent(bodyComponent) {
        return new BodyCameraComponent(bodyComponent);
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