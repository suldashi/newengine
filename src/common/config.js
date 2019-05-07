let config = {
    debug: false,
    imageRoot: "/public/img",
    spriteRoot:"/public/sprites",
};

module.exports = window.gameConfig?{...config, ...window.gameConfig}:config;