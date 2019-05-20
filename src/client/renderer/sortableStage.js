const sort = require("../../common/quickSort");

class SortableStage {
    constructor(options) {
        this.pixiStage = options.pixiStage;
        this.width = options.width;
        this.height = options.height;
        this.renderComponents = [];
    }

    addRenderComponent(renderComponent) {
        this.renderComponents.push(renderComponent);
    }

    updateAll(activeCamera) {
        this.renderComponents = sort(this.renderComponents,(l,r) => {
            if(l.zIndex < r.zIndex) {
                return -1;
            }
            else if(l.zIndex > r.zIndex) {
                return 1;
            }
            else {
                return 0;
            }
        },(i,j) => {
            let lChild = this.pixiStage.getChildAt(i);
            let rChild = this.pixiStage.getChildAt(j);
            this.pixiStage.swapChildren(lChild,rChild);
        });
        for(var i in this.renderComponents) {
            this.renderComponents[i].update(activeCamera);
        }
    }
}

module.exports = SortableStage;