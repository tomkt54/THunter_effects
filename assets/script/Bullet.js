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
        hideObj: {
            default: null,
            type: cc.Node,
        },
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
            //this.node.position = new cc.Vec3(0, 5, 55);
            
            // cc.tween(this.node)
            //     .to(this.duration, { position:targetpos })
            //     //test instantiate hit fx prefab after a delay
            //     .start();
            
           
/*        } catch (err) {
            Log(err.message);
        }*/

        // for curve moving ------------------------
        this.node.position = new cc.Vec3(-20, 3, 55);
        this.node['vx'] = this.node.position.x;
        this.node['vy'] = this.node.position.y;
        this.node['vz'] = this.node.position.z;
        let dur = 1;
        cc.tween(this.node).to(dur, {vz:-50}).start();
        cc.tween(this.node).to(dur, {vy:0}).start();
        cc.tween(this.node).to(dur, {vx:50}, {easing: 'sineOutIn'}).start();
        // -------------------------------------------

        if (this.hideObj) this.hideObj.active = true;

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

                //destroy after 0.5 sec after hit target
                cc.tween(this.node)
                    .delay(0.5)
                    .call(() => {
                        this.node.destroy();
                        //particleSystemCount--;
                        //Log("destroy particle system, count=" + particleSystemCount);
                    })
                    .start();

                //hide obj if there is
                if (this.hideObj) this.hideObj.active = false;

            })
            .start();
    },

    update(dt)
    {
        this.node.position = new cc.Vec3(this.node['vx'], this.node['vy'], this.node['vz']);
    }

});