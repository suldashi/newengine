const MainLoop = require("mainloop.js");
const Physics = require("../common/physics");
const EngineCore = require("../common/entity/core");
const SchedulerFactory = require("../common/scheduler/schedulerFactory");
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
        new EntityFactory());
    
    engineCore.createStatic(0,550,1000,50);
    engineCore.createStatic(0,0,1000,50);
    engineCore.createStatic(0,50,50,500);
    engineCore.createStatic(950,50,50,500);
    
    engineCore.createPlayer(100,400);
    
    MainLoop.setUpdate((delta) => {
        let scaledDelta = delta/1000;
        engineCore.update(scaledDelta);
    }).setDraw(() => {
        renderer.drawFrame();
    }).start();
});