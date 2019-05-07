let playerStateData = {
    angle:0,
    isOrientedLeft:false,
}

class PlayerState {
    constructor(playerObject) {
        this.playerObject = playerObject;
        this.sprite = "idle0";
    }

    switchState(newState) {
        this.playerObject.playerState = newState;
    }

    setAngle(angle) {
        playerStateData.angle = angle;
        if(angle>=90 && angle<=270) {
            playerStateData.isOrientedLeft = true;
        }
        else {
            playerStateData.isOrientedLeft = false;
        }
    }

    get angle() {
        return playerStateData.angle;
    }

    get isOrientedLeft() {
        return playerStateData.isOrientedLeft;
    }
}

class IdleState extends PlayerState {
    constructor(playerObject) {
        super(playerObject);
        this.setAngle(playerStateData.angle);
    }

    setAngle(angle) {
        playerStateData.angle = angle;
        if(angle>90 && angle<270) {
            playerStateData.isOrientedLeft = true;
        }
        else {
            playerStateData.isOrientedLeft = false;
        }
        if(angle==45 || angle==135) {
            this.sprite = "idle45";
        }
        else if(angle==315 || angle==225) {
            this.sprite = "idle315";
        }
        else if(angle==270) {
            this.sprite = "idle270";
        }
        else if(angle==90) {
            this.sprite = "idle90";
        }
        else {
            this.sprite = "idle0";
        }
    }
}

class RunningState extends PlayerState {
    constructor(playerObject) {
        super(playerObject);
        this.sprite = "run0";
    }

    setAngle(angle) {
        playerStateData.angle = angle;
        if(angle>90 && angle<270) {
            playerStateData.isOrientedLeft = true;
        }
        else {
            playerStateData.isOrientedLeft = false;
        }
        if(angle==45 || angle==135) {
            this.sprite = "run45";
        }
        else if(angle==315 || angle==225) {
            this.sprite = "run315";
        }
        else if(angle==270) {
            this.sprite = "run270";
        }
        else if(angle==90) {
            this.sprite = "run90";
        }
    }
}

module.exports = {
    PlayerState,
    IdleState,
    switchToIdleState: (playerComponent) => {
        playerComponent.playerState.switchState(new IdleState(playerComponent));
    },
    switchToRunningState: (playerComponent) => {
        playerComponent.playerState.switchState(new RunningState(playerComponent));
    },
}