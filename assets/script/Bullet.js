cc.Class({
    extends: cc.Component,

    properties: {
        duration: {
            default: 1,
            type: cc.Float,
        }
    },

    targetPos: cc.Vec3,

    fight() {
        //cc.log("this bullet just fired!");
        cc.tween(this.node)
            .to(this.duration, { position: this.targetPos } )
            .start();
    },

});
