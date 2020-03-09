const PIXI = require("./pixi");
const RendererScene = require("./rendererScene");
const StaticCameraComponent = require("./staticCameraComponent");
const InverseIsometricBodyCameraComponent = require("./inverseIsometricBodyCameraComponent");
const IsometricPolygonRenderComponent = require("./isometricPolygonRenderComponent");
const IsometricPlayerRenderComponent = require("./isometricPlayerRenderComponent");
const IsometricStaticRenderComponent = require("./isometricStaticRenderComponent");
const StaticRenderComponent = require("./staticRenderComponent");
const IsometricSwitchRenderComponent = require("./isometricSwitchRenderComponent");
const ShaderComponent = require("./shaderComponent");
const TextComponent = require("./textComponent");
const Vec2 = require("../physics/vec2");
const config = require("../config");

PIXI.utils.skipHello();
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

class PixiRenderer {
    constructor(resources) {
        this.parentElement = document.getElementById("root");
        this.width = config.hres;
        this.height = config.vres;
        this.app = new PIXI.Application({width: this.width, height: this.height});
        this.app.renderer.backgroundColor = 0xDBB691;
        this.activeScene = new RendererScene();
        this.altScene = new RendererScene();
        this.app.stage = this.activeScene.pixiStage;
        this.screenCenter = new Vec2(this.width/2,this.height/2);
        this.parentElement.appendChild(this.app.view);
        this.resources = resources;
        this.shader = null;
    }

    swapScene() {
        let tmp = this.altScene;
        this.altScene = this.activeScene;
        this.activeScene = tmp;
        this.app.stage = this.activeScene.pixiStage;
    }

    createPolygonRenderComponent(bodyComponent) {
        let renderComponent = new IsometricPolygonRenderComponent(bodyComponent,this.graphics);
        this.activeScene.addRenderComponent(renderComponent);
        return renderComponent;
    }

    createIsometricStaticRenderComponent(bodyComponent,textureName,height) {
        let renderComponent = new IsometricStaticRenderComponent(bodyComponent,this.resources,this.activeScene,textureName,height);
        this.activeScene.addRenderComponent(renderComponent);
        return renderComponent;
    }

    createStaticRenderComponent(bodyComponent,textureName,height) {
        let renderComponent = new StaticRenderComponent(bodyComponent,this.resources,this.activeScene,textureName,height);
        this.activeScene.addRenderComponent(renderComponent);
        return renderComponent;
    }

    createSwitchRenderComponent(bodyComponent,switchComponent) {
        let renderComponent = new IsometricSwitchRenderComponent(bodyComponent,switchComponent,this.resources,this.activeScene);
        this.activeScene.addRenderComponent(renderComponent);
        return renderComponent;
    }

    createPlayerRenderComponent(bodyComponent,playerComponent) {
        let renderComponent = new IsometricPlayerRenderComponent(bodyComponent,playerComponent,this.resources,this.activeScene);
        this.activeScene.addRenderComponent(renderComponent);
        return renderComponent;
    }

    createTextComponent() {
        let renderComponent = new TextComponent(this.activeScene);
        this.activeScene.addRenderComponent(renderComponent);
        return renderComponent;
    }

    createCameraComponent(bodyComponent) {
        return new InverseIsometricBodyCameraComponent(bodyComponent);
    }

    setActiveCamera(cameraComponent) {
        this.activeScene.activeCamera = cameraComponent;
    }

    setStaticCamera() {
        this.activeScene.activeCamera = new StaticCameraComponent();
    }

    enableShader() {
        if(!this.isShaderEnabled) {
            this.isShaderEnabled = true;
            this.shader = new ShaderComponent();
            this.activeScene.setShaders([this.shader]);
        }
    }

    drawFrame() {
        requestAnimationFrame(() => {
            this.activeScene.activeCamera.update().negateAndMove(this.screenCenter);
            this.activeScene.update();
        });   
    }
}

module.exports = PixiRenderer;