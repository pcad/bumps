/**
 * Main Controller
 */

'use strict';

var mainController = function(req, res) {
    res.render('index', {
        env: process.env.NODE_ENV || 'development'
    });
    
};

module.exports = {
    index: mainController
};