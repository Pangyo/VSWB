var mongoose = require('mongoose');
var configparser = require('../helper/configparser');

module.exports = function () {
    var db = mongoose.connection;
    db.on('error', console.error);
    db.once('open', function () {
        console.log('DB Connected');

    });

    mongoose.connect(configparser.GetDBUrl());

    return db;
}