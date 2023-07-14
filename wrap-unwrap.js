module.exports = function(RED) {
    function WrapNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.operation = config.operation;
        node.propertyname = "wrapped_msg";
        node.on('input', function(msg) {
            if ("wrap" == node.operation){
               var newMsg = {};
               newMsg[node.propertyname] = msg;
               node.send(newMsg);
            } else {
               var outer_payload = msg.payload;
               var innerMsg = msg[node.propertyname];
               if(innerMsg){
                  innerMsg.outer_payload = outer_payload;
                  node.send(innerMsg);
               } else {
                  this.error(node.operation +": message does not contain a wrapped_msg property nothing to unwrap");
                  node.send(msg);
               }  
            }
        });
    }
    RED.nodes.registerType("wrap-unwrap",WrapNode);
}
