const PrimitiveGameObject = require("./primitiveGameObject");gu

class StaticObject extends PrimitiveGameObject {
    constructor() {
        super();
        this.body = null;
    }

    attachBody(body) {
        this.body = body;
        body.setGameObject(this);
    }
}

module.exports = StaticObject;