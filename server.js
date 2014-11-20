/**
 * Node Server Configuration
 */
'use strict';

// Module dependencies.
var express = require('express');
var errorHandler = require('errorhandler');
var path = require('path');

// Add coloring for console output
require('colors');

// Create Express server.
var app = express();


require('./server/config/express')(app, express, path);

/**
 * Start Express server.
 */
app.listen(app.get('port'), function() {
    console.log('✔ Express server listening on port '.green + '%d'.blue + ' in '.green + '%s'.blue + ' mode'.green, app.get('port'), app.get('env'));
});

// Expose App
module.exports = app;