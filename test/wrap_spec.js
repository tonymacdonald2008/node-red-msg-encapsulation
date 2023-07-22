var helper = require("node-red-node-test-helper");
var wrapNode = require("../wrap.js");
const property_name = 'wrapped_msg';

describe('wrap-msg Node', function () {
  
  beforeEach(function (done) {
      helper.startServer(done);
  });

  afterEach(function (done) {
      helper.unload();
      helper.stopServer(done);
  });

  it('should be loaded', function (done) {
    var flow = [{ id: "n1", type: "wrap-msg", name: "test name" }];
    helper.load(wrapNode, flow, function () {
      var n1 = helper.getNode("n1");
      n1.should.have.property('name', 'test name');
      done();
    });
  });

  it('should create wrapped_msg property', function (done) {
    var flow = [{ id: "n1", type: "wrap-msg", name: "test name",wires:[["n2"]] },
    { id: "n2", type: "helper" }];
    helper.load(wrapNode, flow, function () {
      var n2 = helper.getNode("n2");
      var n1 = helper.getNode("n1");
      n2.on("input", function (msg) {
          try{
            msg.should.have.property(property_name);
            msg[property_name].should.have.property("payload","UpperCase");
            done();
          }catch(err){
            done(err);
          }
      });
      n1.receive({ payload: "UpperCase" });
    });
  });
});