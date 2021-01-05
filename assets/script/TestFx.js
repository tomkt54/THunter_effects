
cc.Class({
    extends: cc.Component,

    properties: {
        fx: {
            default: null,   
            type: cc.Node,
        },
    },



    Spawn() {

        let node = cc.instantiate(this.fx);

        node.parent = this.fx.parent;

        node.setPosition(this.fx.position.clone());

    },
});
