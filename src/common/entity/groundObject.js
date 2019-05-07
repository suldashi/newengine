const GameObject = require("./gameObject");
const Utils = require("../utils");

class GroundObject extends GameObject {
    constructor(startPoint,endPoint,player) {
        super();
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.player = player;
        this.heightOffset = -50;
        this.isOffsetActive = false;
        this.highestY = this.startPoint.y>this.endPoint.y?this.startPoint.y:this.endPoint.y;
    }

    update(delta) {
        super.update(delta);
        if(this.body) {
            let playerPos = this.player.body.position;
            let playerWidth = this.player.body.width;
            let offsetY = this.isOffsetActive?this.heightOffset:0;
            if(this.body.position.y <= playerPos.y) {
                this.isOffsetActive = true;
            }
            else {
                this.isOffsetActive = false;
            }
            if(playerPos.x+playerWidth<this.startPoint.x) {
                this.body.setY(this.startPoint.y + offsetY);
            }
            else if(playerPos.x>this.endPoint.x) {
                this.body.setY(this.endPoint.y + offsetY);
            }
            else {
                this.body.setY(Utils.linear(this.startPoint,this.endPoint,playerPos.x+playerWidth/2)+offsetY);
                if(this.body.position.y - offsetY<this.endPoint.y) {
                    this.body.setY(this.endPoint.y + offsetY);
                }
                else if(this.body.position.y>this.startPoint.y) {
                    this.body.setY(this.startPoint.y + offsetY);
                }
            }
            if(this.body.position.y > this.highestY + offsetY) {
                this.body.setY(this.highestY + offsetY);
            }
        }
    }
}

module.exports = GroundObject;