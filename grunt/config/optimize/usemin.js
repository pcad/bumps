/**
 * Configuration for usemin task(s)
 */
'use strict';

var taskConfig = function(grunt) {

    grunt.config.set('useminPrepare', {
        html: '<%= yeogurt.server %>/templates/index.html',
        options: {
            root: '<%= yeogurt.client %>',
            dest: '<%= yeogurt.dist %>'
        }
    });

    grunt.config.set('usemin', {
        html: '.tmp/index.html',
        options: {
            assetsDirs: ['<%= yeogurt.client %>', '<%= yeogurt.client %>/images']
        }
    });

};

module.exports = taskConfig;
