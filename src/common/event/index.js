const uuid = require("uuid");

class EventBus {
    constructor() {
        this.eventHandlers = [];
    }
    
    emitEvent(eventName,eventData) {
        for(var i in this.eventHandlers[eventName]) {
            if(i !== "*") {
                this.eventHandlers[eventName][i](eventData);
            }
            else {
                this.eventHandlers[eventName]["*"].forEach((el) => {
                    el(eventData);
                });
            }
        }
    }

    on(eventName,callback,eventTarget) {
        if(!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
            this.eventHandlers[eventName]["*"] = [];
        }
        if(eventTarget) {
            this.eventHandlers[eventName][eventTarget] = callback;
        }
        else {
            this.eventHandlers[eventName]["*"].push(callback);
        }
        
    }
}

let eventBus = new EventBus();
window.eventBus = eventBus;

module.exports = eventBus;