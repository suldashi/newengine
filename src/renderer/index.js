const PIXI = require("./pixi");
const SortableStage = require("./sortableStage");
const CameraComponent = require("./cameraComponent");
const InverseIsometricBodyCameraComponent = require("./inverseIsometricBodyCameraComponent");
const IsometricPolygonRenderComponent = require("./isometricPolygonRenderComponent");
const IsometricPlayerRenderComponent = require("./isometricPlayerRenderComponent");
const IsometricStaticRenderComponent = require("./isometricStaticRenderComponent");
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
        this.app.stage.sortableChildren = true;
        this.graphics = new PIXI.Graphics();
        this.app.stage.addChild(this.graphics);
        this.sortableStage = new SortableStage({
            pixiStage:this.app.stage,
            width:this.width,
            height:this.height,
        });
        this.activeCamera = new CameraComponent(0,0);
        this.screenCenter = new Vec2(this.width/2,this.height/2);
        this.parentElement.appendChild(this.app.view);
        this.resources = resources;
        this.shader = null;
    }

    createPolygonRenderComponent(bodyComponent) {
        let renderComponent = new IsometricPolygonRenderComponent(bodyComponent,this.graphics);
        this.sortableStage.addRenderComponent(renderComponent);
        return renderComponent;
    }

    createStaticRenderComponent(bodyComponent,textureName,height) {
        let renderComponent = new IsometricStaticRenderComponent(bodyComponent,this.resources,this.sortableStage,textureName,height);
        this.sortableStage.addRenderComponent(renderComponent);
        return renderComponent;
    }

    createSwitchRenderComponent(bodyComponent,switchComponent) {
        let renderComponent = new IsometricSwitchRenderComponent(bodyComponent,switchComponent,this.resources,this.sortableStage);
        this.sortableStage.addRenderComponent(renderComponent);
        return renderComponent;
    }

    createPlayerRenderComponent(bodyComponent,playerComponent) {
        let renderComponent = new IsometricPlayerRenderComponent(bodyComponent,playerComponent,this.resources,this.sortableStage);
        this.sortableStage.addRenderComponent(renderComponent);
        return renderComponent;
    }

    createTextComponent() {
        let renderComponent = new TextComponent(this.sortableStage);
        this.sortableStage.addRenderComponent(renderComponent);
        return renderComponent;
    }

    createCameraComponent(bodyComponent) {
        return new InverseIsometricBodyCameraComponent(bodyComponent);
    }

    setActiveCamera(cameraComponent) {
        this.activeCamera = cameraComponent;
    }

    enableShader() {
        if(!this.isShaderEnabled) {
            this.isShaderEnabled = true;
            this.shader = new ShaderComponent();
            this.app.stage.filters = [this.shader.shader];
        }
    }

    drawFrame() {
        requestAnimationFrame(() => {
            this.graphics.clear();
            this.activeCamera.update().negateAndMove(this.screenCenter);
            this.sortableStage.updateAll(this.activeCamera);
            if(this.shader) {
                this.shader.update();
            }
        });   
    }
}

module.exports = PixiRenderer;