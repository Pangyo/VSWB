var express = require('express');
var request = require('request');
var packetprocess = require('../../helper/packetprocess')
var vswbhelper = require('../../helper/vswbhelper')
var route = express.Router();

module.exports = function () {

    route.get('/rt/total', function (req, res) {

        res.send(global.glocalsJson);
    });

    route.get('/rt/inner', function (req, res) {

        var localname = req.query.localname;
        
        var index = vswbhelper.ConvertgCityNameToIndex(localname);
        if (index == -1) {
            // XXX 
        } else {
            res.send(global.gcitysListJson[index]);
        }
    });

    route.get('/st/locallist', function(req, res){
        res.send(global.gcitysList);
    });

    return route;
}