let playerStateData = {
    angle:"N",
    isOrientedLeft:false,
}

class PlayerState {
    constructor(playerObject) {
        this.playerObject = playerObject;
        this.sprite = "idle_n";
    }

    switchState(newState) {
        this.playerObject.playerState = newState;
    }

    setAngle(angle) {
        playerStateData.angle = angle;
        if(angle === "S" || angle === "SW" || angle === "W") {
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
        if(angle === "S" || angle === "SW" || angle === "W") {
            playerStateData.isOrientedLeft = true;
        }
        else {
            playerStateData.isOrientedLeft = false;
        }
        if(angle=="N" || angle=="W") {
            this.sprite = "idle_n";
        }
        else if(angle=="NW") {
            this.sprite = "idle_nw";
        }
        else if(angle=="NE" || angle=="SW") {
            this.sprite = "idle_ne";
        }
        else if(angle=="E" || angle=="S") {
            this.sprite = "idle_e";
        }
        else {
            this.sprite = "idle_se"
        }
    }
}

class RunningState extends PlayerState {
    constructor(playerObject) {
        super(playerObject);
        this.sprite = "run_n";
    }

    setAngle(angle) {
        playerStateData.angle = angle;
        if(angle === "S" || angle === "SW" || angle === "W") {
            playerStateData.isOrientedLeft = true;
        }
        else {
            playerStateData.isOrientedLeft = false;
        }
        if(angle=="N" || angle=="W") {
            this.sprite = "run_n";
        }
        else if(angle=="NW") {
            this.sprite = "run_nw";
        }
        else if(angle=="NE" || angle=="SW") {
            this.sprite = "run_ne";
        }
        else if(angle=="E" || angle=="S") {
            this.sprite = "run_e";
        }
        else {
            this.sprite = "run_se"
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