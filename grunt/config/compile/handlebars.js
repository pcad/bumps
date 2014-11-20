/**
 * Configuration for handlebars task(s)
 */
'use strict';

var taskConfig = function(grunt) {

    grunt.config.set('handlebars', {
        server: {
            options: {
                namespace: 'JST'
            },
            files: {
                '<%= yeogurt.staticServer %>/templates/templates.js': ['<%= yeogurt.client %>/templates/*.hbs']
            }
        },
        dist: {
            options: {
                namespace: 'JST'
            },
            files: {
                '.tmp/templates/templates.js': ['<%= yeogurt.client %>/templates/*.hbs']
            }
        },
        test: {
            options: {
                namespace: 'JST'
            },
            files: {
                'test/scripts/templates.js': ['<%= yeogurt.client %>/templates/*.hbs']
            }
        }
    });

};

module.exports = taskConfig;
