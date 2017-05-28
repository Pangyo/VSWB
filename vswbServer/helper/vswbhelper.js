var infos = require('../app/models/api/info');
var intervalprocess = require('./intervalprocess');
var ntiArray = [];

module.exports.Initialize = function () {
    global.glocalsJson = null;
    global.gcitysList = [];
    global.gcitysListJson = [];

    infos.find({}, function (err, info) {
        if (err) {
            console.log('info database is not exit');
            process.exit();
        }

        if (info) {
            for (var i = 0; i < info[0].locallist.length; i++) {
                var item = { 'index': i, 'name': info[0].locallist[i].cityname };
                global.gcitysList.push(item);
            }

            intervalprocess.refresh();
        }
        else {
            console.log('info database is not exit');
            process.exit();
        }
    });
}

module.exports.ConvertgCityNameToIndex = function (name) {
    for (var i = 0; global.gcitysList.length; i++) {
        if (global.gcitysList[i].name == name) {
            return global.gcitysList[i].index;
        }
    }
    return -1;
}
module.exports.ConvertIndexTogCityName = function (index) {

    return 'null'
}

module.exports.SaveDefaultDB = function () {

    var dataContent = new infos();

    var seoul = { 'cityname': '서울' };
    var gyeonggi = { 'cityname': '경기' };
    var busan = { 'cityname': '부산' };
    var daegu = { 'cityname': '대구' };
    var gangwon = { 'cityname': '강원' };
    var jeju = { 'cityname': '제주' };

    dataContent.locallist.push(seoul);
    dataContent.locallist.push(gyeonggi);
    dataContent.locallist.push(busan);
    dataContent.locallist.push(daegu);
    dataContent.locallist.push(gangwon);
    dataContent.locallist.push(jeju);

    dataContent.citycount.seoul = 25;
    dataContent.citycount.gyeonggi = 31;
    dataContent.citycount.busan = 15;
    dataContent.citycount.daegu = 8;
    dataContent.citycount.gangwon = 5;
    dataContent.citycount.jeju = 2;

    dataContent.app.version = '1.0.0.0';

    dataContent.save(function (err) {
        if (err) {
            throw err;
        }
        return true;
    });
}


