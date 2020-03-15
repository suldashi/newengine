const MainLoop = require("mainloop.js");
const Physics = require("./physics");
const CollisionSystem = require("./collision/collisionSystem");
const SceneManager = require("./scene/sceneManager");
const EngineCore = require("./entity/core");
const SchedulerFactory = require("./scheduler/schedulerFactory");
const InputFactory = require("./input/inputFactory");
const EntityFactory = require("./entity/entityFactory");
const PixiRenderer = require("./renderer");
const KeyboardInputProvider = require("./input/keyboardInputProvider");
const TouchscreenInputProvider = require("./input/touchscreenInputProvider");
const ResourceLoader = require("./resourceLoader");

let resourceLoader = new ResourceLoader();
resourceLoader.loadAllResources().then((resources) => {
    
    let renderer = new PixiRenderer(resources);
    let keyboardInputProvider = new KeyboardInputProvider();
    let touchscreenInputProvider = new TouchscreenInputProvider();  //even though they are just initialized, these objects emit events caught by handlers elsewhere
    let engineCore = new EngineCore(
        new SceneManager(),
        new Physics(),
        new CollisionSystem(),
        renderer,
        new SchedulerFactory(),
        new EntityFactory(),
        new InputFactory()
    );

    window.core = engineCore;

    addToAltScene(engineCore);
    engineCore.swapScene();
    addToScene(engineCore);
    engineCore.swapScene();
    MainLoop.setUpdate((delta) => {
        let scaledDelta = delta/1000;
        engineCore.update(scaledDelta);
    }).setDraw(() => {
        renderer.drawFrame();
    }).start();
});

function addToAltScene(engineCore) {
    engineCore.createBattlefield();
    engineCore.createBattlefieldPlayer();
}

function addToScene(engineCore) {
    engineCore.createPlayer(0,0);
    engineCore.createNPC(-128,-128);
    engineCore.createWall(0,-128);
    engineCore.createFloor(0,0);
    engineCore.createFloor(128,0);
    engineCore.createFloor(128,-128);
    engineCore.createFloor(128,-256);
    engineCore.createFloor(0,-256);
    engineCore.createFloor(-128,-256);
    engineCore.createFloor(-128,-128);
    engineCore.createFloor(-128,0);
    engineCore.createWall(-256,0);
    engineCore.createWall(-128,128);
    engineCore.createWall(0,128);
    engineCore.createWall(128,128);
    engineCore.createWall(256,0);
    engineCore.createWall(256,-128);
    engineCore.createWall(-256,-128);
    engineCore.createWall(256,-256);
    engineCore.createWall(-256,-256);
    engineCore.createWall(-128,-384);
    engineCore.createWall(0,-384);
    engineCore.createWall(128,-384);
    engineCore.createOffSwitch(128,0);
    engineCore.createOnSwitch(128,-256);
    engineCore.createArrow(0,-128,0);
    engineCore.createPad(0, 0);
    engineCore.createCornerText();
}