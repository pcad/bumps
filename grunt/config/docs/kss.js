/**
 * Configuration for kss task(s)
 */
'use strict';

var taskConfig = function(grunt) {

    grunt.config.set('kss', {
        options: {
        includeType: 'scss',
        includePath: '<%= yeogurt.client %>/styles/main.scss',
            scssRoot: ['<%= yeogurt.client %>/styles'],
            template: '<%= yeogurt.client %>/docs/styleguide'
        },
        server: {
            files: {
                '<%= yeogurt.staticServer %>/docs/styleguide': ['<%= yeogurt.client %>/styles']
            }
        },
        dist: {
            files: {
                '<%= yeogurt.dist %>/docs/styleguide': ['<%= yeogurt.client %>/styles']
            }
        }
    });

};

module.exports = taskConfig;
