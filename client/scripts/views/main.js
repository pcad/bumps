/**
*   Main View
*/

define(function(require) {
    'use strict';

    // MainView is the top-level piece of UI.
    var MainView = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: '#app-wrapper',

        // Compile our stats template
        template: JST['client/templates/main.hbs'],

        // Delegated events
        events: {},

        // Code that runs when View is initialized
        initialize: function () {
            this.render();
        },

        // Logic to render out template
        render: function () {
            this.$el.html(this.template);
            return this;
        }

    });

    return MainView;
});