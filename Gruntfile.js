module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-concat');

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
        }
    });

    grunt.registerTask('default', ['concat']);
};
