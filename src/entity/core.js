const GameObject = require("./gameObject");
const eventBus = require("../event");

class EngineCore {
    constructor(sceneManager,physics, collisionSystem, renderer,schedulerFactory,entityFactory,inputFactory) {
        this.sceneManager = sceneManager;
        this.physics = physics;
        this.collisionSystem = collisionSystem;
        this.renderer = renderer;
        this.schedulerFactory = schedulerFactory;
        this.entityFactory = entityFactory;
        this.inputFactory = inputFactory;
        this.gameObjects = [];
        this.activeScene = this.sceneManager.createSceneComponent();
        this.altScene = this.sceneManager.createSceneComponent();
        this.collisionSystem.registerCollider("player", "wall", (firstCollisionComponent, secondCollisionComponent, collisionVector) => {
            if(firstCollisionComponent.collisionTag === "player") {
                let reverseCollisionVector = collisionVector.scale(-1);
                firstCollisionComponent.bodyComponent.points = firstCollisionComponent.bodyComponent.points.map(x => x.add(reverseCollisionVector));
                firstCollisionComponent.bodyComponent.center = firstCollisionComponent.bodyComponent.center.add(reverseCollisionVector);
            }
            else {
                secondCollisionComponent.bodyComponent.points = secondCollisionComponent.bodyComponent.points.map(x => x.add(collisionVector));
                secondCollisionComponent.bodyComponent.center = secondCollisionComponent.bodyComponent.center.add(collisionVector);
            }
        });
    }

    swapScene() {
        let tmp = this.altScene;
        this.altScene = this.activeScene;
        this.activeScene = tmp;
        this.renderer.swapScene();
    }

    createCornerText() {
        let textObject = new GameObject();
        let textComponent = this.renderer.createTextComponent();
        textObject.attachComponent(textComponent);
        this.activeScene.addGameObject(textObject);
    }

    createStatic(x,y,w,h) {
        let staticObject = new GameObject();
        let bodyComponent = this.physics.createBodyComponent(x,y,w,h);
        let renderComponent = this.renderer.createPolygonRenderComponent(bodyComponent);
        let polygonRotationComponent = this.physics.createPolygonRotationComponent(bodyComponent);
        staticObject.attachComponent(bodyComponent);
        staticObject.attachComponent(renderComponent);
        staticObject.attachComponent(polygonRotationComponent);
        this.activeScene.addGameObject(staticObject);
    }

    createOffSwitch(x,y) {
        let switchObject = new GameObject();
        let bodyComponent = this.physics.createBodyComponent(x,y,48,48);
        let colliderComponent = this.collisionSystem.createCollisionComponent(bodyComponent,"switch2");
        let switchComponent = this.entityFactory.createSwitchComponent();
        let renderComponent = this.renderer.createSwitchRenderComponent(bodyComponent,switchComponent);
        this.collisionSystem.registerCollider("player","switch2",() => {
            eventBus.emit("playerOnSwitch2");
        });
        eventBus.on("playerOnSwitch2",() => {
            if(!switchComponent.isOn) {
                switchComponent.isOn = true;
                eventBus.emit("switchOn");
            }
        });
        eventBus.on("switchOff",() => {
            switchComponent.isOn = false;
        });
        switchObject.attachComponent(bodyComponent);
        switchObject.attachComponent(colliderComponent);
        switchObject.attachComponent(renderComponent);
        switchObject.attachComponent(switchComponent);
        this.activeScene.addGameObject(switchObject);
    }

    createOnSwitch(x,y) {
        let switchObject = new GameObject();
        let bodyComponent = this.physics.createBodyComponent(x,y,48,48);
        let colliderComponent = this.collisionSystem.createCollisionComponent(bodyComponent,"switch1");
        let switchComponent = this.entityFactory.createSwitchComponent(true);
        let renderComponent = this.renderer.createSwitchRenderComponent(bodyComponent,switchComponent);
        this.collisionSystem.registerCollider("player","switch1",() => {
            eventBus.emit("playerOnSwitch1");
        });
        eventBus.on("playerOnSwitch1",() => {
            if(!switchComponent.isOn) {
                switchComponent.isOn = true;
                eventBus.emit("switchOff");
            }
        });
        eventBus.on("switchOn",() => {
            switchComponent.isOn = false;
        });
        switchObject.attachComponent(bodyComponent);
        switchObject.attachComponent(colliderComponent);
        switchObject.attachComponent(renderComponent);
        switchObject.attachComponent(switchComponent);
        this.activeScene.addGameObject(switchObject);
    }

    createWall(x,y) {
        let staticObject = new GameObject();
        let bodyComponent = this.physics.createBodyComponent(x,y,128,128);
        let colliderComponent = this.collisionSystem.createCollisionComponent(bodyComponent,"wall");
        //let renderComponent = this.renderer.createPolygonRenderComponent(bodyComponent);
        staticObject.attachComponent(bodyComponent);
        staticObject.attachComponent(colliderComponent);
        //staticObject.attachComponent(renderComponent);
        this.activeScene.addGameObject(staticObject);
    }

    createFloor(x,y) {
        let staticObject = new GameObject();
        let bodyComponent = this.physics.createPointBodyComponent(x,y);
        let renderComponent = this.renderer.createStaticRenderComponent(bodyComponent,"floor_N");
        staticObject.attachComponent(bodyComponent);
        staticObject.attachComponent(renderComponent);
        this.activeScene.addGameObject(staticObject);
    }

    createBlock(x,y,height = 0) {
        let staticObject = new GameObject();
        let bodyComponent = this.physics.createPointBodyComponent(x,y);
        bodyComponent.height = height;
        let renderComponent = this.renderer.createStaticRenderComponent(bodyComponent,"block_N");
        staticObject.attachComponent(bodyComponent);
        staticObject.attachComponent(renderComponent);
        this.activeScene.addGameObject(staticObject);
    }

    createMiniBlock(x,y) {
        let staticObject = new GameObject();
        let bodyComponent = this.physics.createPointBodyComponent(x,y);
        let renderComponent = this.renderer.createStaticRenderComponent(bodyComponent,"half_N");
        staticObject.attachComponent(bodyComponent);
        staticObject.attachComponent(renderComponent);
        this.activeScene.addGameObject(staticObject);
    }

    createRamp(x,y,height = 0) {
        let staticObject = new GameObject();
        let bodyComponent = this.physics.createPointBodyComponent(x,y);
        bodyComponent.height = height;
        let renderComponent = this.renderer.createStaticRenderComponent(bodyComponent,"slopeHalf_S");
        staticObject.attachComponent(bodyComponent);
        staticObject.attachComponent(renderComponent);
        this.activeScene.addGameObject(staticObject);
    }

    createArrow(x,y,height = 0) {
        let staticObject = new GameObject();
        let bodyComponent = this.physics.createPointBodyComponent(x,y);
        bodyComponent.height = height;
        let renderComponent = this.renderer.createStaticRenderComponent(bodyComponent,"arrow");
        eventBus.on("switchOff",() => {
            renderComponent.sprite.play();
        });
        eventBus.on("switchOn",() => {
            renderComponent.sprite.stop();
        });
        staticObject.attachComponent(bodyComponent);
        staticObject.attachComponent(renderComponent);
        this.activeScene.addGameObject(staticObject);
    }

    createNPC(x,y) {
        let npc = new GameObject();
        let bodyComponent = this.physics.createBodyComponent(x,y,48,48);
        let renderComponent = this.renderer.createStaticRenderComponent(bodyComponent,"npc");
        let colliderComponent = this.collisionSystem.createCollisionComponent(bodyComponent,"npc");
        let scheduler = this.schedulerFactory.createScheduler();
        scheduler.addTask(1000, () => {
            this.swapScene();
        })
        renderComponent.scale = 2;
        this.collisionSystem.registerCollider("player","npc",() => {
            this.renderer.enableShader();
            scheduler.start();
        });
        npc.attachComponent(bodyComponent);
        npc.attachComponent(renderComponent);
        npc.attachComponent(colliderComponent);
        npc.attachComponent(scheduler);
        this.activeScene.addGameObject(npc);
    }

    createPad(x,y,height = 0) {
        let staticObject = new GameObject();
        let bodyComponent = this.physics.createPointBodyComponent(x,y);
        bodyComponent.height = height;
        let renderComponent = this.renderer.createStaticRenderComponent(bodyComponent,"pad");
        staticObject.attachComponent(bodyComponent);
        staticObject.attachComponent(renderComponent);
        this.activeScene.addGameObject(staticObject);
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
        let renderComponent = this.renderer.createPlayerRenderComponent(bodyComponent, playerComponent);
        let colliderComponent = this.collisionSystem.createCollisionComponent(bodyComponent, "player");
        //let outlineRenderComponent = this.renderer.createPolygonRenderComponent(bodyComponent);
        this.renderer.setActiveCamera(cameraComponent);
        player.attachComponent(bodyComponent);
        player.attachComponent(playerBodyComponent);
        player.attachComponent(playerComponent);
        player.attachComponent(cameraComponent);
        player.attachComponent(renderComponent);
        player.attachComponent(playerInputComponent);
        player.attachComponent(colliderComponent);
        //player.attachComponent(outlineRenderComponent);
        this.activeScene.addGameObject(player);
    }

    createStaticTriangle(x,y,h) {
        let triangle = new GameObject();
        let bodyComponent = this.physics.createTriangleComponent(x,y,h);
        let renderComponent = this.renderer.createPolygonRenderComponent(bodyComponent);
        let polygonRotationComponent = this.physics.createPolygonRotationComponent(bodyComponent);
        triangle.attachComponent(bodyComponent);
        triangle.attachComponent(renderComponent);
        triangle.attachComponent(polygonRotationComponent);
        this.activeScene.addGameObject(triangle);
    }

    createScheduler() {
        let scheduler = this.schedulerFactory.createScheduler();
        return scheduler;
    }

    update(delta) {
        let schedulerComponents = this.activeScene.getComponentsBySystem(this.schedulerFactory);
        this.schedulerFactory.update(schedulerComponents, delta*1000);
        let inputComponents = this.activeScene.getComponentsBySystem(this.inputFactory);
        this.inputFactory.update(inputComponents, delta);
        let physicsComponents = this.activeScene.getComponentsBySystem(this.physics);
        this.physics.update(physicsComponents, delta);
        let collisionComponents = this.activeScene.getComponentsBySystem(this.collisionSystem);
        this.collisionSystem.update(collisionComponents);
        let entities = this.activeScene.getComponentsBySystem(this.entityFactory);
        this.entityFactory.update(entities, delta);
    }
}

module.exports = EngineCore;