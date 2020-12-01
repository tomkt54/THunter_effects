// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
const Log = require('LogView').Log;

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        particles: {
            default: [],
            type: [cc.Node],
        },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    statics: {
        particleSystemCount: cc.Integer,
        AddParticleSystem(value) {
            particleSystemCount += value;
            return particleSystemCount;
        }
    },

    //play single
    playParticle: function (id = 0) {

        //instantiate particle to use
       // let par = this.particles[id];
        let par = cc.instantiate(this.particles[id]);
        par.parent = this.particles[id].parent;
        par.setPosition(this.particles[id].position); 

/*        //debug particle system count and when destroy it --
        try {
            AddParticleSystem(1);
        } catch (err) {
            Log(err.message);
        }
        this.playAllChild(par);
        //AddParticleCount(1);
        Log("asas " + AddParticleSystem(1));*/

        //Log("instantiate new particle system, count=" + particleSystemCount);

        //destroy after 4 sec
        cc.tween(par.node)
            .delay(4)
            .call(() => {
                par.node.destroy();
                //particleSystemCount--;
                //Log("destroy particle system, count=" + particleSystemCount);
            })
            .start();

        // myParticle.play();
    },

    playAllChild: function (node) {
        if (node == null) return;
        let p = node.getComponent(cc.ParticleSystem3D);
        if (p) p.play();

        //if (particle.node == null) return;
        if (node.childrenCount == 0) return;

        let childs = node.children;

        for (p of childs) {
            this.playAllChild(p);
        }
    },

    onKeyDown(event) {
        //cc.log(event.keyCode);
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.playParticle(0);
                //cc.log("A");
                break;
            case cc.macro.KEY.s:
                this.playParticle(1);
                //cc.log("A");
                break;
            case cc.macro.KEY.d:
                this.playParticle(2);
                //cc.log("A");
                break;
        }
    },

    // start () {

    // },

    // update (dt) {},
});
