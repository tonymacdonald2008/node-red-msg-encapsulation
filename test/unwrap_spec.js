var helper = require("node-red-node-test-helper");
var unwrapNode = require("../unwrap.js");
const property_name = 'wrapped_msg';

describe('unwrap-msg Node', function () {
  
  beforeEach(function (done) {
      helper.startServer(done);
  });

  afterEach(function (done) {
      helper.unload();
      helper.stopServer(done);
  });

  it('should be loaded', function (done) {
    var flow = [{ id: "n1", type: "unwrap-msg", name: "test name" }];
    helper.load(unwrapNode, flow, function () {
      var n1 = helper.getNode("n1");
      n1.should.have.property('name', 'test name');
      done();
    });
  });

  it('should create outer_payload property', function (done) {
    var flow = [{ id: "n1", type: "unwrap-msg", name: "test name",wires:[["n2"]] },
    { id: "n2", type: "helper" }];
    helper.load(unwrapNode, flow, function () {
      var n2 = helper.getNode("n2");
      var n1 = helper.getNode("n1");
      n2.on("input", function (msg) {
          try{
            msg.should.have.property("outer_payload", "Payload");
            msg.should.have.property("payload", "UpperCase");
            done();
          }catch(err){
            done(err);
          }
      });
      n1.receive({payload: "Payload", wrapped_msg: { payload: "UpperCase" }});
    });
  });
  
  it('should error on missing wrapped_msg property', function (done) {
    var flow = [{ id: "n1", type: "unwrap-msg", name: "test name",wires:[["n2"]] },
    { id: "n2", type: "helper" }];
    helper.load(unwrapNode, flow, function () {
      var n2 = helper.getNode("n2");
      var n1 = helper.getNode("n1");
      n1.receive({payload: "Payload"});
      n1.on('call:error', call => {
        call.should.be.calledWith('wrapped_msg property not set on incoming msg');
        done();
      });
    });
  });  
});