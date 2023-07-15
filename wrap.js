module.exports = function(RED) {
    function WrapNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.propertyname = "wrapped_msg";
        node.on('input', function(msg) {
            var newMsg = {};
            newMsg[node.propertyname] = msg;
            node.send(newMsg);
        });
    }
    RED.nodes.registerType("wrap",WrapNode);
}
