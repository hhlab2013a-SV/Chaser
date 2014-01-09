var fs = require("fs"), assert = require("assert");
var Chaser = require("../target/chaser.js");

var samples = [];
var samplesDir = __dirname + "/samples/"
var sampleFiles = fs.readdirSync(samplesDir);
sampleFiles.forEach(function(file) {
    var sample = fs.readFileSync(samplesDir + file, { encoding: "UTF-8" });
    sample = sample.split("//---");

    if(sample.length == 2) {
        samples.push({
            expected: JSON.parse(sample[0]),
            source:   sample[1]
        });
    }
});


describe("Chaser", function() {
    describe("#execute()", function() {
        for(var i = 0; i < samples.length; i++) {
            var j = i;

            it("should return execution log", function() {
                assert.equal(samples[j].expected, Chaser.execute(samples[j].source));
            });
        }
    });
});

