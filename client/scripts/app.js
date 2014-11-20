/**
*   Application Logic
*/

define(function(require) {
    'use strict';
    var Router = require('routes');

    var init = function(msg) {
        // Initialize route(s)
        new Router();
        Backbone.history.start();

        console.log('Welcome to Yeogurt!');
    };

    return {
        init: init
    };
});
