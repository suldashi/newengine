const Vec2 = require("./vec2");
const GameObjectBody = require("./gameObjectBody");
const PolygonBodyComponent = require("./polygonBodyComponent");
const PolygonRotationComponent = require("./polygonRotationComponent");

class Physics {

    constructor() {
        this.bodies = [];
        this.collidingBodies = [];
    }

    createBodyComponent(x,y,width,height) {
        let initialPos = new Vec2(x,y);
        let body = new GameObjectBody(initialPos,width,height);
        this.bodies.push(body);
        this.collidingBodies.push(body);
        return body;
    }

    createTriangleComponent(x,y) {
        let body = new PolygonBodyComponent([new Vec2(x,y),new Vec2(x+200,y),new Vec2(x+100,y+141)]);
        this.bodies.push(body);
        this.collidingBodies.push(body); 
        return body;
    }

    createPolygonRotationComponent(polygonComponent) {
        let polygonRotationComponent = new PolygonRotationComponent(polygonComponent);
        this.bodies.push(polygonRotationComponent);
        return polygonRotationComponent;
    }

    checkCollisionPairs() {
        for(var i=0;i<this.collidingBodies.length-1;i++) {
            for(var j=i+1;j<this.collidingBodies.length;j++) {
                let collision = this.checkCollision(this.collidingBodies[i],this.collidingBodies[j]);
                if(collision) {
                    this.collidingBodies[i].points = this.collidingBodies[i].points.map(x => x.add(collision));
                }
            }
        }
    }

    checkCollision(p1,p2) {
        let measure = [];
        let n1 = this.getNormalAxes(p1.points);
        let n2 = this.getNormalAxes(p2.points);
        let allNormals = n1.concat(n2);
        for(var k in allNormals) {
            let normalAngle = -allNormals[k].angle;
            let projected1 = this.projectPolygonToAxis(allNormals[k],p1.points);
            let projected2 = this.projectPolygonToAxis(allNormals[k],p2.points);
            let rotated1 = this.rotateAndCombine(normalAngle,projected1);
            let rotated2 = this.rotateAndCombine(normalAngle,projected2);
            if(rotated1[0]>rotated2[0]) {
                let tmp = rotated1;
                rotated1=rotated2;
                rotated2=tmp;
            }
            if(rotated1[1]<rotated2[0]) {
                measure.push(0);
            }
            else {
                measure.push(rotated1[1]-rotated2[0]);
            }
            
        }
        //let combined = measure.reduce((prev,curr,index) => curr>0?&curr,-1);
        let smallestIndex = -1;
        let smallestValue = 1e10;   //should be big enough for our uses
        for(var i in measure) {
            if(measure[i]<smallestValue) {
                smallestIndex = i;
                smallestValue = measure[i];
            }
        }
        if(smallestValue==0) {
            return null;
        }
        else {
            return allNormals[smallestIndex].scale(smallestValue);
        }
    }

    rotateAndCombine(angle,pointArray) {
        let rotated = pointArray.map(x => x.rotate(angle));
        let smallestX = rotated[0].x;
        let largetstX = rotated[0].x;
        for(var i in rotated) {
            if(rotated[i].x<smallestX) {
                smallestX = rotated[i].x;
            }
            if(rotated[i].x>largetstX) {
                largetstX = rotated[i].x;
            }
        }
        return [smallestX,largetstX];
    }

    getNormalAxes(polygon) {
        let normals = [];
        for(var i=1;i<polygon.length;i++) {
            normals.push(polygon[i].subtract(polygon[i-1]));
        }
        normals.push(polygon[0].subtract(polygon[polygon.length-1]));
        return normals.map(x => x.normal());
    }

    projectPolygonToAxis(axis,polygon) {
        return polygon.map(point => axis.scale(point.dot(axis)/axis.dot(axis)));
    }

    update(delta) {
        for(var i in this.bodies) {
            this.bodies[i].update(delta);
        }
        this.checkCollisionPairs();
    }
}

module.exports = Physics;