module.exports = function(RED) {
    function UnwrapNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.propertyname = "wrapped_msg";
        node.on('input', function(msg, send, done) {
            send = send || function() { node.send.apply(node,arguments) }
            var outer_payload = msg.payload;
            var innerMsg = msg[node.propertyname];
            if(innerMsg){
                innerMsg.outer_payload = outer_payload;
                send(innerMsg);
                if (done) {
                    done();
                }
            } else {
                var err = node.propertyname + " property not set on incoming msg";
                if (done) {
                    // Node-RED 1.0 compatible
                    done(err);
                } else {
                    // Node-RED 0.x compatible
                    node.error(err, msg);
                }
            }
        });
    }
    RED.nodes.registerType("unwrap-msg",UnwrapNode);
}
