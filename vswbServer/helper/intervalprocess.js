var request = require('request');
var packetprocess = require('./packetprocess');
var timer = null;
var result = null;

module.exports.InitTimer = function (value) {
    console.log('Start Timer!');
    timer = setInterval(crawlTime, value);
    
}

module.exports.StopTimer = function () {
    clearInterval(timer);
}

module.exports.refresh = function(){
    crawlTime();
}

function crawlTime() {
    var d = new Date();
    console.log('Call Timer! ', d.getHours(),':',d.getMinutes());
    result = packetprocess.AllMesure(request);
    for (var i = 0; i < global.gcitysList.length; i++) {
        result = packetprocess.InnMesure(request, global.gcitysList[i].name);
    }
}
