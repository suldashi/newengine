const eventBus = require("../../common/event");

class TouchscreenInputProvider {
    constructor() {
        this.backgroundSize = 50;
        this.containerSize = 100;
        this.controlLimit = 20;
        this.currentAngleNr = -1;
        /*
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
        };*/
        this.touchHandler = (e) => {
            e.stopPropagation();
            e.preventDefault();
            let touch = e.changedTouches[0];
            let touchX = touch.clientX-this.controlEl.offsetLeft;
            let touchY = touch.clientY-this.controlEl.offsetTop;
            let nX = touchX - this.containerSize/2;
            let nY = touchY - this.containerSize/2;
            if(nX*nX+nY*nY>this.controlLimit) {
                nX = this.controlLimit*nX/Math.sqrt(nX*nX+nY*nY);
                nY = this.controlLimit*nY/Math.sqrt(nX*nX+nY*nY);
            }
            this.controlEl.style.backgroundPosition = `${nX+this.backgroundSize/2}px ${nY+this.backgroundSize/2}px`;
            let offset = Math.PI/8;
            let angle = -Math.atan2(nY,nX);
            if(angle<0) {
                angle+=Math.PI*2;
            }
            if((angle<=0+offset && angle>0) || (angle<=Math.PI*2 && angle>=Math.PI*2-offset)) {
                let angleNr = 0;
                if(this.currentAngleNr!==angleNr) {
                    this.currentAngleNr = angleNr;
                    eventBus.emitEvent("newInputRight",true);
                    eventBus.emitEvent("newInputUp",false);
                    eventBus.emitEvent("newInputDown",false);
                    eventBus.emitEvent("newInputLeft",false);
                }
                
            }
            else if(angle<=Math.PI/4+offset && angle>=Math.PI/4-offset) {
                let angleNr = 1;
                if(this.currentAngleNr!==angleNr) {
                    this.currentAngleNr = angleNr;
                    eventBus.emitEvent("newInputRight",true);
                    eventBus.emitEvent("newInputUp",true);
                    eventBus.emitEvent("newInputDown",false);
                    eventBus.emitEvent("newInputLeft",false);
                }
            }
            else if(angle<=Math.PI/2+offset && angle>=Math.PI/2-offset) {
                let angleNr = 2;
                if(this.currentAngleNr!==angleNr) {
                    this.currentAngleNr = angleNr;
                    eventBus.emitEvent("newInputUp",true);
                    eventBus.emitEvent("newInputDown",false);
                    eventBus.emitEvent("newInputLeft",false);
                    eventBus.emitEvent("newInputRight",false);
                }
            }
            else if(angle<=3*Math.PI/4+offset && angle>=3*Math.PI/4-offset) {
                let angleNr = 3;
                if(this.currentAngleNr!==angleNr) {
                    this.currentAngleNr = angleNr;
                    eventBus.emitEvent("newInputUp",true);
                    eventBus.emitEvent("newInputLeft",true);
                    eventBus.emitEvent("newInputDown",false);
                    eventBus.emitEvent("newInputRight",false);
                }
            }
            else if(angle<=Math.PI+offset && angle>=Math.PI-offset) {
                let angleNr = 4;
                if(this.currentAngleNr!==angleNr) {
                    this.currentAngleNr = angleNr;
                    eventBus.emitEvent("newInputLeft",true);
                    eventBus.emitEvent("newInputUp",false);
                    eventBus.emitEvent("newInputDown",false);
                    eventBus.emitEvent("newInputRight",false);
                }
            }
            else if(angle<=5*Math.PI/4+offset && angle>=5*Math.PI/4-offset) {
                let angleNr = 5;
                if(this.currentAngleNr!==angleNr) {
                    this.currentAngleNr = angleNr;
                    eventBus.emitEvent("newInputDown",true);
                    eventBus.emitEvent("newInputLeft",true);
                    eventBus.emitEvent("newInputUp",false);
                    eventBus.emitEvent("newInputRight",false);
                }
            }
            else if(angle<=6*Math.PI/4+offset && angle>=6*Math.PI/4-offset) {
                let angleNr = 6;
                if(this.currentAngleNr!==angleNr) {
                    this.currentAngleNr = angleNr;
                    eventBus.emitEvent("newInputDown",true);
                    eventBus.emitEvent("newInputUp",false);
                    eventBus.emitEvent("newInputLeft",false);
                    eventBus.emitEvent("newInputRight",false);
                }
            }
            else {
                let angleNr = 7;
                if(this.currentAngleNr!==angleNr) {
                    this.currentAngleNr = angleNr;
                    eventBus.emitEvent("newInputDown",true);
                    eventBus.emitEvent("newInputRight",true);
                    eventBus.emitEvent("newInputUp",false);
                    eventBus.emitEvent("newInputLeft",false);
                }
            }
        };
        this.controlEl = document.querySelector("#control-root .control-large");
        this.controlEl.ontouchstart = this.touchHandler;
        this.controlEl.ontouchmove = this.touchHandler;

        this.controlEl.ontouchend = (e) => {
            this.controlEl.style.backgroundPosition = `${this.containerSize/2-this.backgroundSize/2}px ${this.containerSize/2-this.backgroundSize/2}px`;
            eventBus.emitEvent("newInputUp",false);
            eventBus.emitEvent("newInputDown",false);
            eventBus.emitEvent("newInputLeft",false);
            eventBus.emitEvent("newInputRight",false);
        }

         

        
    }
}

module.exports = TouchscreenInputProvider;