class SwitchComponent {
    constructor(isOn = false, entityFactory) {
        this.entityFactory = entityFactory;
        this.isOn = isOn;
    }

    get spriteName() {
        return this.isOn?"switchFloorOn_N":"switchFloorOff_N";
    }
}

module.exports = SwitchComponent;