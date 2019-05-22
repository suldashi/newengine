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
        this.physics.registerCollider("player","switch",(firstCollider,secondCollider) => {
            console.log("we are standing on a switch");
        });
        this.physics.registerCollider("player","wall",(firstCollider,secondCollider,collisionVector) => {
            if(firstCollider.colliderTag === "player") {
                let reverseCollisionVector = collisionVector.scale(-1);
                firstCollider.bodyComponent.points = firstCollider.bodyComponent.points.map(x => x.add(reverseCollisionVector));
                firstCollider.bodyComponent.center = firstCollider.bodyComponent.center.add(reverseCollisionVector);
            }
            else {
                secondCollider.bodyComponent.points = secondCollider.bodyComponent.points.map(x => x.add(collisionVector));
                secondCollider.bodyComponent.center = secondCollider.bodyComponent.center.add(collisionVector);
            }
        });
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
        let renderComponent = this.renderer.createPolygonRenderComponent(bodyComponent);
        let polygonRotationComponent = this.physics.createPolygonRotationComponent(bodyComponent);
        staticObject.attachComponent(bodyComponent);
        staticObject.attachComponent(renderComponent);
        staticObject.attachComponent(polygonRotationComponent);
        this.gameObjects.push(staticObject);
    }

    createSwitch(x,y) {
        let switchObject = new GameObject();
        let bodyComponent = this.physics.createBodyComponent(x,y,64,64);
        let colliderComponent = this.physics.createColliderComponent("switch",bodyComponent);
        let renderComponent = this.renderer.createStaticRenderComponent(bodyComponent,"switchFloorOff_N");
        switchObject.attachComponent(bodyComponent);
        switchObject.attachComponent(colliderComponent);
        switchObject.attachComponent(renderComponent);
        this.gameObjects.push(switchObject);
    }

    createWall(x,y) {
        let staticObject = new GameObject();
        let bodyComponent = this.physics.createBodyComponent(x,y,128,128);
        let colliderComponent = this.physics.createColliderComponent("wall",bodyComponent);
        //let renderComponent = this.renderer.createPolygonRenderComponent(bodyComponent);
        staticObject.attachComponent(bodyComponent);
        staticObject.attachComponent(colliderComponent);
        //staticObject.attachComponent(renderComponent);
        this.gameObjects.push(staticObject);
    }

    createFloor(x,y) {
        let staticObject = new GameObject();
        let bodyComponent = this.physics.createPointBodyComponent(x,y);
        let renderComponent = this.renderer.createStaticRenderComponent(bodyComponent,"floor_N");
        staticObject.attachComponent(bodyComponent);
        staticObject.attachComponent(renderComponent);
        this.gameObjects.push(staticObject);
    }

    createBlock(x,y,height = 0) {
        let staticObject = new GameObject();
        let bodyComponent = this.physics.createPointBodyComponent(x,y);
        bodyComponent.height = height;
        let renderComponent = this.renderer.createStaticRenderComponent(bodyComponent,"block_N");
        staticObject.attachComponent(bodyComponent);
        staticObject.attachComponent(renderComponent);
        this.gameObjects.push(staticObject);
    }

    createMiniBlock(x,y) {
        let staticObject = new GameObject();
        let bodyComponent = this.physics.createPointBodyComponent(x,y);
        let renderComponent = this.renderer.createStaticRenderComponent(bodyComponent,"half_N");
        staticObject.attachComponent(bodyComponent);
        staticObject.attachComponent(renderComponent);
        this.gameObjects.push(staticObject);
    }

    createRamp(x,y,height = 0) {
        let staticObject = new GameObject();
        let bodyComponent = this.physics.createPointBodyComponent(x,y);
        bodyComponent.height = height;
        let renderComponent = this.renderer.createStaticRenderComponent(bodyComponent,"slopeHalf_S");
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
        let colliderComponent = this.physics.createColliderComponent("player",bodyComponent);
        this.renderer.setActiveCamera(cameraComponent);
        player.attachComponent(playerBodyComponent);
        player.attachComponent(playerComponent);
        player.attachComponent(cameraComponent);
        player.attachComponent(renderComponent);
        player.attachComponent(playerInputComponent);
        player.attachComponent(colliderComponent);
        this.gameObjects.push(player);
    }

    createStaticTriangle(x,y,h) {
        let triangle = new GameObject();
        let bodyComponent = this.physics.createTriangleComponent(x,y,h);
        let renderComponent = this.renderer.createPolygonRenderComponent(bodyComponent);
        let polygonRotationComponent = this.physics.createPolygonRotationComponent(bodyComponent);
        triangle.attachComponent(bodyComponent);
        triangle.attachComponent(renderComponent);
        triangle.attachComponent(polygonRotationComponent);
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