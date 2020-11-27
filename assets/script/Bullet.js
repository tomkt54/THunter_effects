cc.Class({
    extends: cc.Component,

    properties: {
        duration: {
            default: 1,
            type: cc.Float,
        },
        hitfx: {
            default: null,
            type: cc.Node,
        },
    },

    //set by main
    targetPos: cc.Vec3,

    fight() {
        //cc.log("this bullet just fired!");
        cc.tween(this.node)
            .to(this.duration, { position: this.targetPos })
            //test instantiate hit fx prefab after a delay
            .start();
        //spawn hitfx
        cc.tween(this.node)
            .delay(this.duration)
            .call(() => {
                //-----------------------------------------------------------
                //create hitfx after duration
                let _hitfx = cc.instantiate(this.hitfx);

                //set pos to bullet, and parent
                _hitfx.parent = this.node.parent;
                //set to current position of _bullet
                _hitfx.setPosition(this.node.position);

            })
            .start();
    },

});