module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.initConfig({
        concat: {
            target: {
                src:  ['src/parser.js', 'src/executor.js'],
                dest: 'target/kirakira_javascript.js',
            },
            sample: {
                src: ['src/parser.js', 'src/executor.js'],
                dest: 'sample/js/kirakira_javascript.js',
            }
        }
    });

    grunt.registerTask('default', ['concat']);
};
