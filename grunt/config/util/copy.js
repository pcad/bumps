/**
 * Configuration for copy task(s)
 */
'use strict';

var taskConfig = function(grunt) {

    grunt.config.set('copy', {
        server: {
            files: [{
                expand: true,
                cwd: '<%= yeogurt.client %>/',
                dest: '<%= yeogurt.staticServer %>/',
                src: [
                    'scripts/**/*.js',
                    'bower_components/**/*.{js,map,css,woff,otf,ttf,eot,svg}',
                    'docs/styleguide/public/images',
                    'styles/**/*.css',
                    'images/**',
                    '*.{ico,png,txt}',
                    'styles/fonts/**/*.{woff,otf,ttf,eot,svg}',
                ]
            }]
        },
        dist: {
            files: [{
                expand: true,
                cwd: '<%= yeogurt.client %>/',
                dest: '<%= yeogurt.dist %>/',
                src: [
                    'bower_components/requirejs/require.js',
                    'bower_components/modernizr/modernizr.js',
                    'bower_components/**/*.{woff,otf,ttf,eot,svg}',
                    'docs/styleguide/public/images',
                    '!*.js',
                    '*.{ico,png,txt}',
                    'images/**/*.{webp}',
                    'styles/fonts/**/*.{woff,otf,ttf,eot,svg}'
                ]
            }, {
                expand: true,
                cwd: 'server/templates/',
                dest: '.tmp',
                src: [
                    'index.html'
                ]
            }]
        }
    });

};

module.exports = taskConfig;
