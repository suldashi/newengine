const CollisionComponent = require("./collisionComponent");
const checkCollision = require("./satCollisionChecker");

class CollisionSystem {
    constructor() {
        this.collisionCOmponents = [];
        this.colliderCallbacks = {};
    }

    createCollisionComponent(bodyComponent,collisionTag) {
        let collisionComponent = new CollisionComponent(bodyComponent,collisionTag, this);
        this.collisionCOmponents.push(collisionComponent);
        return collisionComponent;
    }

    registerCollider(firstTag,secondTag,onCollisionCallback) {
        this.colliderCallbacks[this.getTagIndex(firstTag,secondTag)] = onCollisionCallback;
    }

    getTagIndex(firstTag, secondTag) {
        if(firstTag>secondTag) {
            return `${firstTag}|${secondTag}`;
        }
        else {
            return `${secondTag}|${firstTag}`;
        }
    }

    update(collisionComponents) {
        for(let i=0;i<collisionComponents.length-1;i++) {
            for(let j=i+1;j<collisionComponents.length;j++) {
                let firstTag = collisionComponents[i].collisionTag;
                let secondTag = collisionComponents[j].collisionTag;
                let collisionTag = this.getTagIndex(firstTag,secondTag);
                if(this.colliderCallbacks[collisionTag]) {
                    let collision = checkCollision(collisionComponents[i].bodyComponent,collisionComponents[j].bodyComponent);
                    if(collision) {
                        this.colliderCallbacks[collisionTag](collisionComponents[i],collisionComponents[j],collision);
                    }
                }
            }
        }
    }
}

module.exports = CollisionSystem;