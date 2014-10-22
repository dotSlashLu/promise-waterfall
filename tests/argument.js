var waterfall = require("../index.js"),
    Promise = require("bluebird"),
    chai = require("chai"),
    expect = chai.expect;

describe("Malform argument - string", function() {
  it("should throw an Error", function(){
    var badWaterfall = function (){waterfall("a")}
    expect(badWaterfall).to.throw("Array with reduce function is needed.");
  })
})

describe("Malform argument - empty array", function() {
  it("should throw an Error", function() {
    var badWaterfall = function(){waterfall([]);}
    expect(badWaterfall).to.throw(Error);
  })
})

describe("Malform argument - first function doesn't return promise", function() {
  it("should throw an Error", function(){
    var queue = [
      function(){
        return 1;
      },
      function(){
        return 2;
      }
    ];
    function test(){waterfall(queue)}
    expect(test).to.throw("Function return value should be a promise.");
  })
})

describe("Malform argument - second function doesn't return promise", function() {
  it("should throw an Error", function(){
    var queue = [
      function(){
        return new Promise(function(resolve){
          resolve(1);
        })
      },
      function(){
        return "I want error.";
      },
      function(){
        return "should not reach here.";
      }
    ];
    function test(){waterfall(queue)}
    expect(test).to.throw("Function return value should be a promise.");
  })
})

describe("Normal argument - array with one function", function() {
  it("should be ok and log 'Test'", function() {
    var ok = waterfall([function(){console.log("Test"); return "ok";}])
    expect(ok).to.equal("ok");
  })
})
