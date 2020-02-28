const CameraComponent = require("./cameraComponent");
const PIXI = require("./pixi.js");

class RendererScene {
    constructor() {
        this.pixiStage = new PIXI.Container();
        this.graphics = new PIXI.Graphics();
        this.pixiStage.sortableChildren = true;
        this.pixiStage.addChild(this.graphics);
        this.activeShaders = [];
        this.renderComponents = [];
        this.activeCamera = new CameraComponent(0,0);
    }

    setShaders(shaders) {
        this.activeShaders = shaders;
        this.pixiStage.filters = shaders.map(x => x.shader);
    }

    addRenderComponent(renderComponent) {
        this.renderComponents.push(renderComponent);
    }

    update() {
        this.graphics.clear();
        for(var i in this.renderComponents) {
            this.renderComponents[i].update(this.activeCamera);
        }
        for(var i in this.activeShaders) {
            this.activeShaders[i].update();
        }
    }
}

module.exports = RendererScene;