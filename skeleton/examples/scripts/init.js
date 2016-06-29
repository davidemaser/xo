/**
 * Created by david-maser on 29/06/16.
 * require.js app init
 */
requirejs.config({
    baseUrl: '../lib/',
    paths: {
        jquery: 'bower_components/jquery/dist/jquery',
        bootstrap: 'bower_components/bootstrap/dist/js/bootstrap.min'
    }
});
define(['jquery', 'bootstrap'], function (jquery) {
    var bootLoad = require('bootstrap');//load bootstrap once jq is loaded
});