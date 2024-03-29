/**
 * Builds out an optimised site through minification of CSS and HTML, as well as uglification and optimisation of Javascript.
 */
'use strict';

var taskConfig = function(grunt) {
    grunt.registerTask('build', 'Build a production ready version of your site.', [
        'clean:dist',
        'env:prod',
        'injector',
        'copy:dist',
        'concurrent:compile',
        'autoprefixer:server',
        'kss:dist',
        'useminPrepare',
        'concat:generated',
        'cssmin',
        'usemin',
        'htmlmin:dist',
        'uglify',
        'clean:temp'
    ]);
};

module.exports = taskConfig;
