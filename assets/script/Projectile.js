// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        v3Target: {
            default: new cc.Vec3(1, 2, 3),
        },
        /*        v3Random: {
                    default: new cc.Vec3(0,0,0),
                },*/
        duration: {
            default: 1,
            type: cc.Float,
        },
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
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
    },

    Fire() {
/*        let ran = new cc.Vec3(Math.random(-this.v3Random.x, this.v3Random.x),
            Math.random(-this.v3Random.y, this.v3Random.y),
            Math.random(-this.v3Random.z, this.v3Random.z));
*/        let targetPos = this.node.position.add(this.v3Target);//.add(ran);
        cc.tween(this.node)
            .to(this.duration, { position: targetPos })
            .start();
    }

    // update (dt) {},
});