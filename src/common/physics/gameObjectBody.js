const uuid = require("uuid");
const Vec2 = require("./vec2");
const MotionConstrainer = require("./motionConstrainer");

class GameObjectBody {
    constructor(position,width,height) {
        this.id = uuid();
        this.position = position;
        this.prevPosition = position.copy();
        this.width = width;
        this.height = height;
        this.velocity = new Vec2(0,0);
        this.acceleration = new Vec2(0,0);
        this.controlVelocity = new Vec2(0,0);
        this.isStatic = false;
        this.gameObject = null;
        this.otherBody = null;
        this.motionConstrainer = new MotionConstrainer();
    }

    setVelocity(velocity) {
        this.velocity = velocity;
    }

    setXVelocity(value) {
        this.velocity.x = value;
    }

    setYVelocity(value) {
        this.velocity.y = value;
    }

    addVelocity(velocity) {
        this.velocity.addToThis(velocity);
    }

    setControlVelocity(velocity) {
        this.controlVelocity = velocity;
    }

    setAcceleration(acceleration) {
        this.acceleration = acceleration;
    }

    setXAcceleration(value) {
        this.acceleration.x = value;
    }

    setYAcceleration(value) {
        this.acceleration.y = value;
    }

    setGameObject(gameObject) {
        this.gameObject = gameObject;
    }

    setY(value) {
        let currentY = this.position.y;
        let difference = currentY - value;
        this.position.y = value;
        if(this.otherBody) {
            this.otherBody.setY(this.otherBody.position.y-difference);
        }
    }

    isVerticalDisabled() {
        return this.motionConstrainer.isDownConstrained() && this.motionConstrainer.isUpConstrained();
    }
    
    disableVerticalMovement() {
        this.motionConstrainer.addUpConstraint();
        this.motionConstrainer.addDownConstraint();
        this.velocity = this.motionConstrainer.applyConstraintsToVector(this.velocity);
    }

    enableVerticalMovement() {
        this.motionConstrainer.removeUpConstraint();
        this.motionConstrainer.removeDownConstraint();
    }

    disableLeftMovement() {
        this.motionConstrainer.addLeftConstraint();
        this.velocity = this.motionConstrainer.applyConstraintsToVector(this.velocity);
    }

    disableRightMovement() {
        this.motionConstrainer.addRightConstraint();
        this.velocity = this.motionConstrainer.applyConstraintsToVector(this.velocity);
    }

    enableLeftMovement() {
        this.motionConstrainer.removeLeftConstraint();
    }

    enableRightMovement() {
        this.motionConstrainer.removeRightConstraint();
    }

    translateY(value) {
        this.position = this.position.add(new Vec2(0,value));
    }

    translateX(value) {
        this.position = this.position.add(new Vec2(value,0));
    }

    translate(vec) {
        this.position = this.position.add(vec);
    }

    getPositionDelta() {
        return this.position.subtract(this.prevPosition);
    }

    attachOtherBody(otherBody) {
        this.otherBody = otherBody;
    }

    detachOtherBody() {
        this.otherBody = null;
    }

    update(delta) {
        this.prevPosition = this.position.copy();
        if(!this.isStatic) {
            let accelerationDelta = this.acceleration.scale(delta);
            let constrainedAcceleration = this.motionConstrainer.applyConstraintsToVector(accelerationDelta);
            this.velocity.addToThis(constrainedAcceleration);
        }
        let velocityDelta = this.velocity.scale(delta);
        let constrainedVelocity = this.motionConstrainer.applyConstraintsToVector(velocityDelta);
        this.position.addToThis(constrainedVelocity);

        let controlVelocityDelta = this.controlVelocity.scale(delta);
        let constrainedControlVelocity = this.motionConstrainer.applyConstraintsToVector(controlVelocityDelta);
        this.position.addToThis(constrainedControlVelocity);
        
        if(this.otherBody) {
            this.otherBody.position.addToThis(constrainedVelocity);
            this.otherBody.position.addToThis(constrainedControlVelocity);
        }
    }
}

module.exports = GameObjectBody;