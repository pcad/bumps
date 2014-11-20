/**
 * Express configuration
 */
'use strict';

var compress = require('compression');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');

// Configuration files
var settings = require('./env/default');
var security = require('./security');

var expressConfig = function(app, express, path) {

    var hour = 3600000;
    var day = hour * 24;
    var week = day * 7;

    var env = app.get('env');

    // Setup port for server to run on
    app.set('port', settings.server.port);

     // Setup view engine for server side templating
    app.engine('.html', require('ejs').__express);
    app.set('view engine', 'html');

    // Remove x-powered-by header (doesn't let clients know we are using Express)
    app.disable('x-powered-by');

    // Setup path where all server templates will reside
    app.set('views', path.join(settings.root, 'server/templates'));

    if ('production' === env) {
        // Enable GZip compression for all static assets
        app.use(compress());
    }
    else if ('development' === env) {
        // Include livereload script
        app.use(require('connect-livereload')());

        // Disable caching for easier testing
        app.use(function noCache(req, res, next) {
            res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.header('Pragma', 'no-cache');
            res.header('Expires', 0);
            next();
        });
    }

    // Load favicon
    app.use(favicon((settings.root + '/' + settings.staticAssets + '/favicon.ico')));

    app.use(express.static(path.join(settings.root, settings.staticAssets), {maxAge: week}));

    // Setup log level for server console output
    app.use(logger('dev'));

    // Returns middleware that parses both json and urlencoded.
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Load routes
    require('../routes')(app);

    /**
     * 500 Error Handler.
     * As of Express 4.0 it must be placed at the end of all routes.
     */
    app.use(errorHandler());

};

module.exports = expressConfig;