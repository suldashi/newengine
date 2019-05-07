const eventBus = require("../../common/event");

class TouchscreenInputProvider {
    constructor() {
        this.leftDomEl = document.querySelector("#control-root .left");
        this.rightDomEl = document.querySelector("#control-root .right");
        this.jumpDomEl = document.querySelector("#control-root .jump");
        this.leftDomEl.ontouchstart = (e) => {
            e.preventDefault();
            e.stopPropagation();
            eventBus.emitEvent("newInputLeft",true);
        };
        this.leftDomEl.ontouchend = (e) => {
            e.preventDefault();
            e.stopPropagation();
            eventBus.emitEvent("newInputLeft",false);
        };
        this.rightDomEl.ontouchstart = (e) => {
            e.preventDefault();
            e.stopPropagation();
            eventBus.emitEvent("newInputRight",true);
        };
        this.rightDomEl.ontouchend = (e) => {
            e.preventDefault();
            e.stopPropagation();
            eventBus.emitEvent("newInputRight",false);
        };
        this.jumpDomEl.ontouchstart = (e) => {
            e.preventDefault();
            e.stopPropagation();
            eventBus.emitEvent("newInputUp",true);
        };
        this.jumpDomEl.ontouchend = (e) => {
            e.preventDefault();
            e.stopPropagation();
            eventBus.emitEvent("newInputUp",false);
        };
    }
}

module.exports = TouchscreenInputProvider;