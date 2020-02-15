/*
    Note: 
    speed is used in this manner: 60fps multiplied by the speed variable. An animation with a speed of 1/6 will play at 10 fps.
    If there are 6 frames in this animation, it will loop every 0.6 seconds (600ms).
*/ 

let playerOffsetY = -26;
module.exports = {
    images: {
        idle_n: {
            baseName:"run",
            offsetY:playerOffsetY,
        },
        idle_nw: {
            baseName:"run",
            offsetY:playerOffsetY,
        },
        idle_ne: {
            baseName:"run",
            offsetY:playerOffsetY,
        },
        idle_e: {
            baseName:"run",
            offsetY:playerOffsetY,
        },
        idle_se: {
            baseName:"run",
            offsetY:playerOffsetY,
        },
        floor_N: {
            baseName:"floor"
        },
        block_N: {
            baseName:"floor",
            offsetY:-78,
        },
        half_N: {
            baseName:"floor",
            offsetY:-39,
        },
        slopeHalf_S: {
            baseName:"floor",
            offsetY:-39,
        },
        switchFloorOff_N: {
            baseName:"floor"
        },
        switchFloorOn_N: {
            baseName:"floor"
        }

    },
    sheets: 
    {
        run: {
            url:"run.png",
            data:"run.json"
        },
        floor: {
            url:"floor.png",
            data:"floor.json",
        },
        pad: {
            url: "pad.png",
            data: "pad.json"
        }
    },
    animations: [
        {
            baseName:"run",
            name:"run_n",
            frames:["run_n_1","run_n_2","run_n_3","run_n_4","run_n_5","run_n_6"],
            speed:1/6,
            offsetY:playerOffsetY,
        },
        {
            baseName:"run",
            name:"run_nw",
            frames:["run_nw_1","run_nw_2","run_nw_3","run_nw_4","run_nw_5","run_nw_6"],
            speed:1/6,
            offsetY:playerOffsetY,
        },
        {
            baseName:"run",
            name:"run_ne",
            frames:["run_ne_1","run_ne_2","run_ne_3","run_ne_4","run_ne_5","run_ne_6"],
            speed:1/6,
            offsetY:playerOffsetY,
        },
        {
            baseName:"run",
            name:"run_e",
            frames:["run_e_1","run_e_2","run_e_3","run_e_4","run_e_5","run_e_6"],
            speed:1/6,
            offsetY:playerOffsetY,
        },
        {
            baseName:"run",
            name:"run_se",
            frames:["run_se_1","run_se_2","run_se_3","run_se_4","run_se_5","run_se_6"],
            speed:1/6,
            offsetY:playerOffsetY,
        },
        {
            baseName:"floor",
            name:"arrow",
            frames:["arrow_0","arrow_1","arrow_2","arrow_3"],
            speed:1/6,
            offsetY:-10,
        },
        {
            baseName:"pad",
            name:"pad",
            frames:["pad_0","pad_1","pad_2","pad_3","pad_2","pad_1"],
            speed:1/15,
        },
    ]
};