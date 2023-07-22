module.exports = function(RED) {
    function WrapNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.propertyname = "wrapped_msg";
        node.on('input', function(msg, send, done) {
            send = send || function() { node.send.apply(node,arguments) }
            var newMsg = {};
            newMsg[node.propertyname] = msg;
            send(newMsg);
            if (done) {
                done();
            }
        });
    }
    RED.nodes.registerType("wrap-msg",WrapNode);
}
