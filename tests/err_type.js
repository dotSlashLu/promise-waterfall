var waterfall = require("../index.js"),
    chai = require("chai"),
    expect = chai.expect;

var badWaterfall = function (){waterfall("a")}
describe("Malform argument", function() {
  it("should throw an Error", function(){
    expect(badWaterfall).to.throw(Error);
  })
})
    