var assert = require("assert");
var Chaser = require("../target/chaser.js");

describe("Chaser", function() {
    describe("#test()", function() {
        it("should return 'test'", function() {
            assert.equal("test", Chaser.test());
        });
    });

    describe("#execute()", function() {
        it("should return execution log", function() {
            assert.equal(null, Chaser.execute("var a = 0;"));
        });
    });
});

