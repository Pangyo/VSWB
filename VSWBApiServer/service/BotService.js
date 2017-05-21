
const request = require('request');
const url = 'http://127.0.0.1:5000';

const Bot = {};

Bot.region = (content, callback) => {
    
    switch (content) {
        case '종합':
            console.log('종합 입력!');
            Bot.total((err, result) => {
                callback(err, result);
            });
            break;
        case '경기 성남':
            console.log('경기 입력!');
            Bot.inner((err, result) => {
                callback(err, result);
            });
            break;
        case '제주':
            callback(null, '제주 리턴 : 테스트중입니다.');
            break;
        default:
            break;
    }
};

Bot.total = (callback) => {
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

Bot.inner = (callback) => {
    innerUrl = url + "/api/rt/inner";
    request.get(innerUrl, (err, res, html) => {
        if (!err && res.statusCode === 200) {
            let resultList = JSON.parse(res.body).response.body[0].items[0].item[11];
            let reuslt = resultList.cityName[0] + ":" + resultList.pm10Value[0] + getState(resultList.pm10Value[0]);
            callback(null, reuslt);
        } else {
            callback(err, null)
        }
    });
};

function getState (content) {
    if(content <= 30) {
        return ("(좋음)");
    }
    else if(content <= 80) {
        return("(보통)");
    }
    else if(content <= 150) {
        return("(나쁨)");
    }
    else {
        return("(매우나쁨)");
    }
};

module.exports = Bot;