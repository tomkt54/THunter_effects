
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
        //moveV3: cc.Vec3,
        hideObj: {
            default: null,
            type: cc.Node,
        },
        arc: {
            default: false,
        },
    },

    targetPos: cc.Vec3,

    onLoad()
    {
        this.lastPos = this.node.position;
    },

    initBeforeFlying() {
        //cc.log('init before flying');

        let v3 = this.node.position.clone();
        //cc.log(v3);

        this.node['vx'] = v3.x;
        this.node['vy'] = v3.y;
        this.node['vz'] = v3.z;
    },

    flyToTarget() {
        cc.log('fly to target');

        // for curve moving ------------------------

        this.initBeforeFlying();
        let dur = this.duration;

        cc.tween(this.node).to(dur, { vx: this.targetPos.x }).start();
        cc.tween(this.node).to(dur, { vy: this.targetPos.y }).start();
        cc.tween(this.node).to(dur, { vz: this.targetPos.z }).start();

        // -------------------------------------------

        if (this.hideObj) this.hideObj.active = true;

        this.scheduleSpawnHitFx();
    },

    //fly random
    fight() {
        //cc.log("this bullet just fired!");
        //try {
            //let targetpos = this.node.position.add(this.moveV3);
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

        this.initBeforeFlying();

        let dur = this.duration;
        let durhalf = this.duration / 2;
        cc.tween(this.node).to(dur, {vy:0}).start();
        //cc.tween(this.node).to(dur, {vx:50}, {easing: 'sineOutIn'}).start();

        //random target pos
        let horizon = cc.math.randomRange(-30, 30);
        let far = cc.math.randomRange(-7, -15);

        if (this.arc) {
            //up 
            let up = cc.math.randomRange(10, 15);
            cc.tween(this.node).to(durhalf, { vy: up }, { easing: 'sineOut' }).start();
            //down
            cc.tween(this.node).delay(durhalf).to(durhalf, { vy: 0.2 }, { easing: 'sineIn' }).start();
        } else {
            cc.tween(this.node).to(dur, { vy: 0.2 }).start();
        }
        
        //forward
        cc.tween(this.node).to(dur, { vz: far }).start();
        cc.tween(this.node).to(dur, { vx: horizon }).start();


        // -------------------------------------------

        if (this.hideObj) this.hideObj.active = true;

        this.scheduleSpawnHitFx();
    },

    scheduleSpawnHitFx() {
        //at target
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
        if (this.node['vx'] === undefined) return;

        this.node.position = new cc.Vec3(this.node['vx'], this.node['vy'], this.node['vz']);
        if (this.lastPos)
        {
            //get dir = curPos - lastPos >> dir x-1 >> lookDir = curPos + dir >> node lookAt using lookDir
/*            let v = cc.Vec3.subtract(new cc.Vec3(), this.node.position, this.lastPos);
            v.scale(new cc.Vec3(-1, -1, -1));
            let p = cc.Vec3.add(new cc.Vec3(), this.node.position, v);
            this.node.lookAt(p);*/

            //get dir = curPos - lastPos >> x-1 >> new quat from view up using dir >> set rotation.
            let curPos = this.node.position.clone();
            let dir = curPos.subtract(this.lastPos).normalize();
            let quat = new cc.Quat();
            cc.Quat.fromViewUp(quat, dir, new cc.Vec3(-1, 0, 0));
            this.node.setRotation(quat);

        }
        this.lastPos = this.node.position.clone();
    }

});