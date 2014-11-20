/**
 * Configuration for injector task(s)
 */
'use strict';

var _str = require('underscore.string');

var taskConfig = function(grunt) {

    grunt.config.set('injector', {
        options: {

        },
        // Inject component scss into main.scss
        sass: {
            options: {
                transform: function(filePath) {
                    filePath = filePath.replace('/client/styles/', '');
                    
                    return '@import \'' + filePath.slice(0, -5) + '\';';
                },
                starttag: '// [injector]',
                endtag: '// [endinjector]'
            },
            files: {
                '<%= yeogurt.client %>/styles/main.scss': [
                    '<%= yeogurt.client %>/styles/**/*.scss',
                    '!<%= yeogurt.client %>/styles/main.scss'
                ]
            }
        },
        // Inject component css into index.html
        css: {
            options: {
                transform: function(filePath) {
                    filePath = filePath.replace('/client/', '');
                    return '<link rel="stylesheet" href="' + filePath + '">';
                },
                starttag: '<!-- [injector:css] -->',
                endtag: '<!-- [endinjector] -->'
            },
            files: {
                '<%= yeogurt.server %>/templates/index.html': [
                    '<%= yeogurt.client %>/styles/**/*.css',
                    '!<%= yeogurt.client %>/styles/main.css'
                ]
            }
        }
    });

};

module.exports = taskConfig;
