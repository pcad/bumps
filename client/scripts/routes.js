/**
*   Main Router
*/

define(function(require) {
    'use strict';

    var MainView = require('views/main');

    var MainRouter = Backbone.Router.extend({
        // Defined routes
        routes: {
            '': 'main'
        },

        main: function() {
            // Initialize the main view
            new MainView();
        }
    });

    return MainRouter;
});