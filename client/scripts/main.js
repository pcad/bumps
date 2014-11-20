/**
*   Main Configuration
*/

require.config({
    baseUrl: './scripts',
});

require(['app', 'data/db'], function (app, db) {
    console.log(db);
    app.init();
});
