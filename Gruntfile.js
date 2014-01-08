module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-mocha-test');

    sources = ['src/parser.js', 'src/replacer.js', 'src/executor.js']

    grunt.initConfig({
        concat: {
            target: {
                src:  sources,
                dest: 'target/kirakira_javascript.js'
            },
            sample: {
                src:  sources,
                dest: 'sample/js/kirakira_javascript.js'
            }
        },

        mochaTest: {
            all: {
                src: ['test/**/*.js']
            }
        }
    });

    grunt.registerTask('default', ['concat', 'mochaTest:all']);
};
