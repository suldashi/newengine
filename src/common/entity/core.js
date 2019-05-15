const GameObject = require("./gameObject");
const EngineCoreContainer = require("./coreContainer");
const eventBus = require("../event");

class EngineCore {
    constructor(physics,renderer,schedulerFactory,entityFactory,inputFactory) {
        this.physics = physics;
        this.renderer = renderer;
        this.schedulerFactory = schedulerFactory;
        this.entityFactory = entityFactory;
        this.inputFactory = inputFactory;
        this.gameObjects = [];
        EngineCoreContainer.setCoreInstance(this);
    }

    createCornerText() {
        let textObject = new GameObject();
        let textComponent = this.renderer.createTextComponent();
        textObject.attachComponent(textComponent);
        this.gameObjects.push(textObject);
    }

    createStatic(x,y,w,h) {
        let staticObject = new GameObject();
        let bodyComponent = this.physics.createBodyComponent(x,y,w,h);
        let renderComponent = this.renderer.createStaticRenderComponent(bodyComponent);
        staticObject.attachComponent(bodyComponent);
        staticObject.attachComponent(renderComponent);
        this.gameObjects.push(staticObject);
    }

    createPlayer(x,y) {
        let player = new GameObject();
        let w = 20;
        let h = 20;
        let bodyComponent = this.physics.createBodyComponent(x,y,w,h);
        let playerBodyComponent = this.entityFactory.createPlayerBodyComponent(bodyComponent);
        let cameraComponent = this.renderer.createCameraComponent(bodyComponent);
        let playerComponent = this.entityFactory.createPlayerComponent();
        let playerInputComponent = this.inputFactory.createPlayerInputComponent();
        let renderComponent = this.renderer.createPlayerRenderComponent(bodyComponent,playerComponent);
        this.renderer.setActiveCamera(cameraComponent);
        player.attachComponent(playerBodyComponent);
        player.attachComponent(cameraComponent);
        player.attachComponent(renderComponent);
        player.attachComponent(playerInputComponent);
        this.gameObjects.push(player);
    }

    createTriangle(x,y) {
        let triangle = new GameObject();
        let bodyComponent = this.physics.createTriangleComponent(x,y);
        let renderComponent = this.renderer.createPolygonRenderComponent(bodyComponent);
        let playerInputComponent = this.inputFactory.createPlayerInputComponent();
        let controlComponent = this.entityFactory.createPlayerPolygonComponent(bodyComponent);
        //let polygonRotationComponent = this.physics.createPolygonRotationComponent(bodyComponent);
        triangle.attachComponent(bodyComponent);
        triangle.attachComponent(renderComponent);
        triangle.attachComponent(controlComponent);
        triangle.attachComponent(playerInputComponent);
        //triangle.attachComponent(polygonRotationComponent);
        this.gameObjects.push(triangle);
    }

    createStaticTriangle(x,y) {
        let triangle = new GameObject();
        let bodyComponent = this.physics.createTriangleComponent(x,y);
        let renderComponent = this.renderer.createPolygonRenderComponent(bodyComponent);
        triangle.attachComponent(bodyComponent);
        triangle.attachComponent(renderComponent);
        this.gameObjects.push(triangle);
    }

    createScheduler() {
        let scheduler = this.schedulerFactory.createScheduler();
        return scheduler;
    }

    update(delta) {
        this.schedulerFactory.update(delta*1000);
        this.inputFactory.update(delta);
        this.physics.update(delta);
        this.entityFactory.update(delta);
    }
}

module.exports = EngineCore;