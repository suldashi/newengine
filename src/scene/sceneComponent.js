class SceneComponent {
    constructor() {
        this.gameObjects = [];
        this.allComponents = [];
    }

    getComponentsBySystem(system) {
        return this.allComponents.filter(x => x.system === system);
    }

    addGameObject(gameObject) {
        this.gameObjects.push(gameObject);
        this.allComponents = this.allComponents.concat(gameObject.components);
    }
}

module.exports = SceneComponent;