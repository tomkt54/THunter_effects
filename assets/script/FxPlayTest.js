// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

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
            type: [cc.ParticleSystem3D],
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


    //play single
    playParticle: function (id = 0) {
        this.playAllChild(this.particles[id]);
        // myParticle.play();
    },

    playAllChild: function (particle) {
        if (particle == null) return;
        let p = particle.getComponent(cc.ParticleSystem3D);
        if (p) p.play();

        if (particle.node == null) return;
        if (particle.node.childrenCount == 0) return;

        let childs = particle.node.children;

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
        }
    },

    // start () {

    // },

    // update (dt) {},
});
