class EngineCoreContainer {
    constructor() {
        this.core = null;
    }

    setCoreInstance(core) {
        this.core = core;
    }

    getCoreInstance() {
        return this.core;
    }
}

module.exports = new EngineCoreContainer();