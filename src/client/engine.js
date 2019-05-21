const MainLoop = require("mainloop.js");
const Physics = require("../common/physics");
const EngineCore = require("../common/entity/core");
const SchedulerFactory = require("../common/scheduler/schedulerFactory");
const InputFactory = require("../common/input/inputFactory");
const EntityFactory = require("../common/entity/entityFactory");

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
        new Physics(),
        renderer,
        new SchedulerFactory(),
        new EntityFactory(),
        new InputFactory()
    );
    /*
    engineCore.createFloor(256,256);

    engineCore.createFloor(128,256);
    engineCore.createRamp(256,128);

    engineCore.createFloor(128,128);
    engineCore.createMiniBlock(256,0);

    engineCore.createFloor(128,0);
    engineCore.createMiniBlock(256,-128);

    engineCore.createFloor(0,0);
    engineCore.createMiniBlock(128,-128);
    
    engineCore.createMiniBlock(-128,0);
    engineCore.createBlock(0,-128);

    engineCore.createBlock(-128,-128);
    
    engineCore.createBlock(-128,-256);
    engineCore.createMiniBlock(-256,-128);

    engineCore.createBlock(-256,-256);
    */
    engineCore.createPlayer(0,0);
    engineCore.createWall(0,-128);
    engineCore.createRamp(0,-128);
    engineCore.createBlock(0,-128);
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
    
    
    engineCore.createCornerText();
    
    MainLoop.setUpdate((delta) => {
        let scaledDelta = delta/1000;
        engineCore.update(scaledDelta);
    }).setDraw(() => {
        renderer.drawFrame();
    }).start();
});