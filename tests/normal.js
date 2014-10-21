var w = require("../index"),
    Q = require("q"),
    list = [];

var chai = require("chai"),
    expect = chai.expect,
    should = chai.should();

describe("Normal", function(){
  it("should log every 2 secs", function(done){

    for(var i = 0; i < 5; i++) {
      list.push(function(params){
        var deferred = Q.defer();
        Q.delay(2000).then(
          function (){
            var k, time;
            if (!params) k = 0;
            else k = params.index;
            time = new Date();
            console.log("Executing function " + k + " @ " + time.toString());
            deferred.resolve({
              index: ++k,
              time: time
            });
          }
        );
        return deferred.promise;
      })
    }
    w(list).then(function(params){
      params["index"].should.equal(list.length);
      done();
    })
    .catch(function(err){
      done(err);
    })

  })
})
