module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-watch');

    sources = ['src/chaser.js']

    grunt.initConfig({
        concat: {
            target: {
                src:  sources,
                dest: 'target/chaser.js'
            },
            sample: {
                src:  sources,
                dest: 'sample/js/chaser.js'
            }
        },

        jshint: {
            files: {
                src: ['src/**/*.js']
            }
        },

        mochaTest: {
            all: {
                src: ['test/**/*.js']
            }
        },

        watch: {
            files: ['src/**/*.js', 'test/**/*.js'],
            tasks: ['default'],
        }
    });

    grunt.registerTask('default', ['concat', 'mochaTest:all', 'jshint']);
};
