module.exports = {
    images: {
        idle0: {
            baseName:"run"
        },
        idle45: {
            baseName:"run"
        },
        idle90: {
            baseName:"run"
        },
        idle270: {
            baseName:"run"
        },
        idle315: {
            baseName:"run"
        }
    },
    sheets: 
    {
        run:{
            url:"run.png",
            data:"run.json"
        }
    },
    animations: [
        {
            baseName:"run",
            name:"run0",
            frames:["run0_1","run0_2","run0_3","run0_4","run0_5","run0_6"],
            speed:1/6
        },
        {
            baseName:"run",
            name:"run45",
            frames:["run45_1","run45_2","run45_3","run45_4","run45_5","run45_6"],
            speed:1/6
        },
        {
            baseName:"run",
            name:"run315",
            frames:["run315_1","run315_2","run315_3","run315_4","run315_5","run315_6"],
            speed:1/6
        },
        {
            baseName:"run",
            name:"run270",
            frames:["run270_1","run270_2","run270_3","run270_4","run270_5","run270_6"],
            speed:1/6
        },
        {
            baseName:"run",
            name:"run90",
            frames:["run90_1","run90_2","run90_3","run90_4","run90_5","run90_6"],
            speed:1/6
        },
    ]
};