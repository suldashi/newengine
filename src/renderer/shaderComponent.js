const PIXI = require("./pixi");
let shaderText = document.getElementById("shader").innerText;

class ShaderComponent {
    constructor() {
        this.shaderText = shaderText;
        this.counter = 0;
        this.uniforms = {
            delta: 0
        }
        this.shader = new PIXI.Filter(null,shaderText,this.uniforms);
        this.currentTime = performance.now();
    }

    update() {
        let newTime = performance.now();
        let deltaTime = newTime - this.currentTime;
        this.counter += deltaTime;
        this.uniforms.delta = this.counter/1000;
        this.currentTime = newTime;
    }
}
module.exports = ShaderComponent;