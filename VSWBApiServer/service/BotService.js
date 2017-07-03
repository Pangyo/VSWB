const request = require('request');
const urlencode = require('urlencode');
const url = 'http://127.0.0.1:5000';
const fs = require('fs');

const bot = {};

bot.total = (callback) => {
    totalUrl = url + "/api/rt/total";
    request.get(totalUrl, (err, res, html) => {
        if (!err && res.statusCode === 200) {
            let resultList = JSON.parse(res.body).response.body[0].items[0].item[0];
            let result = "현재 시간 : " + resultList.dataTime[0];
            result = result + "\n서울 : " + resultList.seoul[0] + getState(resultList.seoul[0]);
            result = result + "\n부산 : " + resultList.busan[0] + getState(resultList.busan[0]);
            result = result + "\n대구 : " + resultList.daegu[0] + getState(resultList.daegu[0]);
            result = result + "\n인천 : " + resultList.incheon[0] + getState(resultList.incheon[0]);
            result = result + "\n광주 : " + resultList.gwangju[0] + getState(resultList.gwangju[0]);
            result = result + "\n대전 : " + resultList.daejeon[0] + getState(resultList.daejeon[0]);
            result = result + "\n울산 : " + resultList.ulsan[0] + getState(resultList.ulsan[0]);
            result = result + "\n경기 : " + resultList.gyeonggi[0] + getState(resultList.gyeonggi[0]);
            result = result + "\n강원 : " + resultList.gangwon[0] + getState(resultList.gangwon[0]);
            result = result + "\n충북 : " + resultList.chungbuk[0] + getState(resultList.chungbuk[0]);
            result = result + "\n충남 : " + resultList.chungnam[0] + getState(resultList.chungnam[0]);
            result = result + "\n전북 : " + resultList.jeonbuk[0] + getState(resultList.jeonbuk[0]);
            result = result + "\n전남 : " + resultList.jeonnam[0] + getState(resultList.jeonnam[0]);
            result = result + "\n경북 : " + resultList.gyeongbuk[0] + getState(resultList.gyeongbuk[0]);
            result = result + "\n경남 : " + resultList.gyeongnam[0] + getState(resultList.gyeongnam[0]);
            result = result + "\n제주 : " + resultList.jeju[0] + getState(resultList.jeju[0]);
            result = result + "\n세종 : " + resultList.sejong[0] + getState(resultList.sejong[0]);
            callback(null, result);
        } else {
            callback(err, null)
        }
    });
};

bot.deatailSearch = (main, detail, callback) => {
    innerUrl = url + "/api/rt/inner?localname=" + urlencode(main);
    console.log(innerUrl);
    request.get(innerUrl, (err, res, html) => {
        if (!err && res.statusCode === 200) {
            let detailRegion = JSON.parse(res.body).response.body[0].items[0].item;

            for (var i in detailRegion) {
                if (detailRegion[i].cityName[0] === detail) {
                    bot.deatailParser(detailRegion[i], (err, reuslt) => {
                        callback(null, reuslt);
                    });
                }
            }
        } else {
            callback(err, null);
        }
    });
};

bot.deatailParser = (data, callback) => {
    var detailData;
    detailData = "현재시간 : ";
    detailData += data.dataTime;
    detailData += "\n도시이름 : ";
    detailData += data.cityName;
    detailData += "\n미세먼지 : ";
    detailData += data.pm10Value;
    detailData += getState(data.pm10Value);
    detailData += "\n초미세먼지 : ";
    detailData += data.pm25Value;
    detailData += "\n오존 : ";
    detailData += data.o3Value;
    callback(null, detailData);
};

bot.locallist = (content, callback) => {
    locallistUrl = url + "/api/st/locallist";
    request.get(locallistUrl, (err, res, html) => {
        if (!err && res.statusCode === 200) {
            resultList = JSON.parse(res.body);
            var reuslt = new Array;
            for (var i in resultList) {
                reuslt.push(resultList[i].name);
            }
            callback(null, reuslt);
        } else {
            callback(err, null)
        }
    });
};

function getState(content) {
    if (content <= 30) {
        return ("(좋음)");
    } else if (content <= 80) {
        return ("(보통)");
    } else if (content <= 150) {
        return ("(나쁨)");
    } else {
        return ("(매우나쁨)");
    }
};

module.exports = bot;