/**
 * Configuration for concurrent task(s)
 */
'use strict';

var taskConfig = function(grunt) {

    grunt.config.set('concurrent', {
        compile: [
            'pngmin:dist',
            'imagemin:dist',
            'jsdoc:dist',
            'svgmin:dist',
            'sass:dist',
            'handlebars:dist',
            'requirejs'
        ]
    });

};

module.exports = taskConfig;
