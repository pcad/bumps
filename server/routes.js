/**
 * Server Routes
 */

'use strict';

// Load controller.
var mainController = require('./controllers/main');

var routes = function (app) {
    // Catch All: Matches all routes to let HTML5 pushState work
    // Place all routes above this one
    app.get('*', mainController.index);
};

module.exports = routes;