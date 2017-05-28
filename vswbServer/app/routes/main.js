var express = require('express');
var route = express.Router();

module.exports = function () {
    route.get('/', function (req, res) {
        res.redirect('/login');
    })

    var loginController = require('../controllers/login.controller');
    route.get('/login', loginController.viewRender);

    var dashboardController = require('../controllers/dashboard.controller');
    route.get('/dashboard', checklogin, dashboardController.viewRender);

    var chartsController = require('../controllers/charts.controller');
    route.get('/charts', checklogin, chartsController.viewRender);

    return route;
}

var checklogin = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
