const Scheduler = require("./scheduler");

class SchedulerFactory {
    constructor() {
        this.schedulers = [];
    }

    createScheduler() {
        let scheduler = new Scheduler(this);
        this.schedulers.push(scheduler);
        return scheduler;
    }

    update(schedulerComponents, deltaInMilliseconds) {
        for(var i in schedulerComponents) {
            schedulerComponents[i].update(deltaInMilliseconds);
        }
    }
}

module.exports = SchedulerFactory;