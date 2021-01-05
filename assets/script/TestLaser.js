// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
const Bullet = require('Bullet');

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
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        bullet: {
            default: null,
            type: Bullet,
        },
        target: {
            default: null,
            type: cc.Node,
        },
        interval: {
            default: 0.1,
            type: cc.Float,
        },
        elapsed: {
            default: 0,
            visible: false,
        },
        firing: {
            default: false,
            visible: false,
        },
    },



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.log(this.bullet);
        this.elapsed = 0.000;
        this.firing = false;
    },


    toggleFire() {
        cc.log('toggle fire');
        this.firing = !this.firing;
        if (this.firing) this.fire();
    },

    fire() {
        //cc.log('fire');
        let _bullet = cc.instantiate(this.bullet.node).getComponent(Bullet);


        //set pos to bullet, and parent
        let node = _bullet.node;
        node.parent = this.bullet.parent;

        node.setPosition(this.bullet.node.position.clone());

        //setup target pos
        _bullet.targetPos = this.target.position.clone();

        //set off the bullet
        _bullet.flyToTarget();
    },

    //fire each interval
    update(dt) {
        cc.log('firing '+this.firing);
        //cc.log('elapsed ' + this.elapsed);
        if (!this.firing) return;

        this.elapsed += dt;
        if (this.elapsed >= this.interval) {
            this.elapsed = 0;
            this.fire();
            //cc.log('fire in update');
        }
    },
});
