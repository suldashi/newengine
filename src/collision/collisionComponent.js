class CollisionComponent {
    constructor(bodyComponent, collisionTag, collisionSystem) {
        this.system = collisionSystem;
        this.bodyComponent = bodyComponent;
        this.collisionTag = collisionTag;
    }
}

module.exports = CollisionComponent;