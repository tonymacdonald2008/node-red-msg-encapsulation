module.exports = function(RED) {
    function UnwrapNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.propertyname = "wrapped_msg";
        node.on('input', function(msg) {
           var outer_payload = msg.payload;
           var innerMsg = msg[node.propertyname];
           if(innerMsg){
              innerMsg.outer_payload = outer_payload;
              node.send(innerMsg);
           } else {
              this.error(node.operation +": message does not contain a wrapped_msg property nothing to unwrap");
              node.send(msg);
           }  
        });
    }
    RED.nodes.registerType("unwrap",UnwrapNode);
}
