
// For some reason, best to do an old-style require fo chai
var expect = require("chai").expect;
import {Car} from "../src/carInAncientConstructorStyle";


describe("Calling the constructor on Car", function() {
    
    it("should return a new initial object", function() {
        const car1 = new Car({});
        expect(car1).not.null;
        expect(car1.direction).to.equal(0);
    });

    it('end then calling turn 90', function () {
        const car1 = new Car({});
        car1.turn(45).turn(45);
        expect(true).to.be.equal(true);
    })
})