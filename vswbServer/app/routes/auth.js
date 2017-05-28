var express = require('express');
var route = express.Router();

module.exports = function (passport) {

    route.post('/login', passport.authenticate('login', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    }));

    route.post('/register', passport.authenticate('register', {
        successRedirect: '/home',
        failureRedirect: '/about',
        failureFlash: true
    }));

    return route;
}