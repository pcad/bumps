/**
 * Configuration for watch task(s)
 */
'use strict';

var _ = require('lodash');

var taskConfig = function(grunt) {

    // Configuration
    var config = {
        configFiles: {
            files: [
                'Gruntfile.js',
                'grunt/**/*.js',
                '*.json'
            ],
            options: {
                reload: true,
                interrupt: true
            },
            tasks: [
                'serve:nowatch'
            ]
        },
        html: {
            files: [
                '<%= yeogurt.client %>/templates/**/*.html'
            ],
            tasks: [
                'newer:copy:server',
                'clean:temp'
            ]
        },
        sass: {
            files: ['<%= yeogurt.client %>/styles/**/*.{scss,sass,md}'],
            tasks: [
                'injector:sass',
                'sass:server',
                'autoprefixer:server'
            ]
        },
        injectCss: {
            files: [
                '<%= yeogurt.client %>/styles/**/*.css'
            ],
            tasks: [
                'injector:css',
                'autoprefixer:server'
            ]
        },
        js: {
            files: [
                '<%= yeogurt.client %>/scripts/**/*.js'
            ],
            tasks: [
                'newer:jshint',
                'newer:copy:server'
            ]
        },
        handlebars: {
            files: ['<%= yeogurt.client %>/templates/**/*.hbs'],
            tasks: [
                'handlebars:server'
            ]
        },
        images: {
            files: ['<%= yeogurt.client %>/images/**/*.{png,jpg,gif}'],
            tasks: ['newer:copy:server']
        },
        root: {
            files: [
                '<%= yeogurt.client %>/*.{ico,png,txt,html}',
                '<%= yeogurt.client %>/images/**/*.webp',
                '<%= yeogurt.client %>/styles/fonts/**/*.*'
            ],
            tasks: ['newer:copy:server']
        },
        livereload: {
            options: {
                livereload: true
            },
            files: [
                '<%= yeogurt.staticServer %>/*.{ico,png,txt,html}',
                '<%= yeogurt.staticServer %>/**/*.html',
                '<%= yeogurt.staticServer %>/styles/**/*.{css,ttf,otf,woff,svg,eot}',
                '<%= yeogurt.staticServer %>/scripts/**/*.js',
                '<%= yeogurt.staticServer %>/templates/**/*.{jst,hbs,jade}',
                '<%= yeogurt.staticServer %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
            ]
        },
        express: {
            files: [
                'server.js',
                'server/**/*.{js,json,html}'
            ],
            tasks: [
                'express:server',
                'wait'
            ],
            options: {
                livereload: true,
                nospawn: true //Without this option specified express won't be reloaded
            }
        }
    };
    
    // Documentation specific configuration
    var docsConfig = {
        html: {
            tasks: [
                'dashboard:server',
            ]
        },
        sass: {
            tasks: [
                'kss:server'
            ]
        },
        js: {
            files: [
                'README.md'
            ],
            tasks: [
                'jsdoc:server'
            ]
        },
        kss: {
            files: [
                '<%= yeogurt.client %>/docs/styleguide/**/*.*'
            ],
            tasks: ['kss:server']
        },
    };

    grunt.config.set('watch', config);
    
    grunt.registerTask('listen:docs', function() {
        // Merge docsConfig object with the config object without overwriting arrays
        // Instead concatenate all arrays with each other
        grunt.config('watch', _.merge(config, docsConfig, function(a, b) {
            return _.isArray(a) ? a.concat(b) : undefined;
        }));
        grunt.task.run('watch');
    });
    

};

module.exports = taskConfig;
