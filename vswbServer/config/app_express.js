var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

module.exports = function () {
    var app = express();
    app.locals.pretty = true;

    // view engine init
    //app.set('views', path.join(__dirname, 'views'));
    app.set('views', './app/views')
    app.set('view engine', 'jade');

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static('./public'));

    app.use(session({
        secret: 'yunjaekim',
        resave: true,
        saveUninitialized: true
    }));

    return app;
}