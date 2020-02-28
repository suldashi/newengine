const SceneComponent = require("./sceneComponent");

class SceneManager {
    constructor() {
        this.scenes = [];
    }

    createSceneComponent() {
        let scene = new SceneComponent();
        this.scenes.push(scene);
        return scene;
    }
}

module.exports = SceneManager;