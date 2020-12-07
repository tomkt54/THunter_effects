const Log = require('LogView').Log;

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
        moveV3: cc.Vec3,
    },

    fight() {
        //cc.log("this bullet just fired!");
        //try {
            let targetpos = this.node.position.add(this.moveV3);
/*        } catch (err) {
            Log(err.message);
        }*/

        //Log("pos: " + this.node.position.toString());
        //Log("target pos " + this.node.position.add(this.moveV3).toString());

        //try {
            cc.tween(this.node)
                .to(this.duration, { position: targetpos })
                //test instantiate hit fx prefab after a delay
                .start();
/*        } catch (err) {
            Log(err.message);
        }*/
        

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