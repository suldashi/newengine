const Vec2 = require("./vec2");

class MotionConstrainer {
    constructor() {
        this.left = 0;
        this.right = 0;
        this.up = 0;
        this.down = 0;
    }

    addLeftConstraint() {
        this.left++;
    }

    addRightConstraint() {
        this.right++;
    }

    addUpConstraint() {
        this.up++;
    }

    addDownConstraint() {
        this.down++;
    }

    removeLeftConstraint() {
        this.left--;
        if(this.left<0) {
            this.left = 0;
        }
    }

    removeRightConstraint() {
        this.right--;
        if(this.right<0) {
            this.right = 0;
        }
    }

    removeUpConstraint() {
        this.up--;
        if(this.up<0) {
            this.up = 0;
        }
    }

    removeDownConstraint() {
        this.down--;
        if(this.down<0) {
            this.down = 0;
        }
    }

    isLeftConstrained() {
        return this.left > 0;
    }

    isRightConstrained() {
        return this.right > 0;
    }

    isUpConstrained() {
        return this.up > 0;
    }

    isDownConstrained() {
        return this.down > 0;
    }

    applyConstraintsToVector(vec) {
        let newVec = vec.copy();
        if(newVec.x>0 && this.isRightConstrained()) {
            newVec.x = 0;
        }
        if(newVec.x<0 && this.isLeftConstrained()) {
            newVec.x = 0;
        }
        if(newVec.y>0 && this.isDownConstrained()) {
            newVec.y = 0;
        }
        if(newVec.y<0 && this.isUpConstrained()) {
            newVec.y = 0;
        }
        return newVec;
    }
}

module.exports = MotionConstrainer;