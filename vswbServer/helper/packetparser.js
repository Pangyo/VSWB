var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var Local = require('../app/models/api/local');
var City = require('../app/models/api/city');
var vswbhelper = require('./vswbhelper');

function ParseToString(content) {

    var bodyjson, bodyparser = 'None';

    parser.parseString(content, function (err, result) {
        bodyparser = JSON.stringify(result);
        bodyjson = JSON.parse(bodyparser);
    });

    return bodyjson;
}

module.exports.GetRtAllMesureValue = function (xxmlContent) {

    var jsonContent = ParseToString(xxmlContent);

    var updateTime = String(jsonContent.response.body[0].items[0].item[0].dataTime);
    Local.findOne({ 'local.updated': updateTime }, function (err, local) {
        if (err) {
            return false;
        }

        if (local) {
            // already exist
            return true;
        } else {
            var dataContent = new Local();
            dataContent.local.updated = updateTime;
            dataContent.local.seoul = Number(jsonContent.response.body[0].items[0].item[0].seoul);
            dataContent.local.busan = Number(jsonContent.response.body[0].items[0].item[0].busan);
            dataContent.local.daegu = Number(jsonContent.response.body[0].items[0].item[0].daegu);
            dataContent.local.incheon = Number(jsonContent.response.body[0].items[0].item[0].incheon);
            dataContent.local.gwangju = Number(jsonContent.response.body[0].items[0].item[0].gwangju);
            dataContent.local.daejeon = Number(jsonContent.response.body[0].items[0].item[0].daejeon);
            dataContent.local.ulsan = Number(jsonContent.response.body[0].items[0].item[0].ulsan);
            dataContent.local.gyeonggi = Number(jsonContent.response.body[0].items[0].item[0].gyeonggi);
            dataContent.local.gangwon = Number(jsonContent.response.body[0].items[0].item[0].gangwon);
            dataContent.local.chungbuk = Number(jsonContent.response.body[0].items[0].item[0].chungbuk);
            dataContent.local.chungnam = Number(jsonContent.response.body[0].items[0].item[0].chungnam);
            dataContent.local.jeonbuk = Number(jsonContent.response.body[0].items[0].item[0].jeonbuk);
            dataContent.local.jeonnam = Number(jsonContent.response.body[0].items[0].item[0].jeonnam);
            dataContent.local.gyeongbuk = Number(jsonContent.response.body[0].items[0].item[0].gyeongbuk);
            dataContent.local.gyeongnam = Number(jsonContent.response.body[0].items[0].item[0].gyeongnam);
            dataContent.local.jeju = Number(jsonContent.response.body[0].items[0].item[0].jeju);
            dataContent.local.sejong = Number(jsonContent.response.body[0].items[0].item[0].sejong);

            dataContent.save(function (err) {
                if (err) {
                    throw err;
                }
                console.log('Save Local', 'Time: ' , updateTime);
                return true;
            });
        }
    });

    // save global
    global.glocalsJson = jsonContent;
}

module.exports.GetRtInnMesureValue = function (xxmlContent, localname) {

    var jsonContent = ParseToString(xxmlContent);
    for (var index in jsonContent.response.body[0].items[0].item) {

        OnSaveCity(jsonContent.response.body[0].items[0].item[index], localname);
    }

    var index = vswbhelper.ConvertgCityNameToIndex(localname);
    if (index == -1) {
        // XXX 
    } else {
        // save global
        global.gcitysListJson[index] = jsonContent;
    }
}

function OnSaveCity(currentItem, localname) {
    var updated = String(currentItem.dataTime);
    var cityName = String(currentItem.cityName);
    var localName = String(localname);

    // get city collection name from currentTime
    var collectionName = updated.split(" ");

    // get city collection
    var currentCityCollection = City.GetCityCollection(collectionName[0]);

    // city key = [updateTime, CityName, LocalName]
    currentCityCollection.findOne({
        $and: [
            { 'city.updated': updated },
            { 'city.cityname': cityName },
            { 'city.localname': localName }
        ]

    }, function (err, city) {
        if (err) {
            return false;
        }

        if (city) {
            // already exist
            return true;
        } else {
            // Make City Collection 
            var dataContent = new City.GetCityCollection(collectionName[0])();
            dataContent.city.localname = String(localname);
            dataContent.city.updated = String(currentItem.dataTime);
            dataContent.city.cityname = String(currentItem.cityName);
            dataContent.city.so2value = String(currentItem.so2Value);
            dataContent.city.covalue = String(currentItem.coValue);
            dataContent.city.o3value = String(currentItem.o3Value);
            dataContent.city.no2value = String(currentItem.no2Value);
            dataContent.city.pm10value = String(currentItem.pm10Value);
            dataContent.city.pm25value = String(currentItem.pm25Value);

            dataContent.save(function (err) {
                if (err) {
                    throw err;
                }
                console.log('Save City','Name: ',String(currentItem.cityName), 'Time: ',String(currentItem.dataTime));
                return true;
            });
        }
    });
}