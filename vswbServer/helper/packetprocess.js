var packetparser = require('./packetparser');
var configparser = require('./configparser');

module.exports.AllMesure = function (request) {

    var url =
        configparser.GetOptionURL() + '/'
        + configparser.GetOptionFeature() + '/'
        + configparser.GetAllMesureFeature() + '?'
        + configparser.GetAllMesureParam() + '&ServiceKey='
        + configparser.GetOptionServiceKey();

    request({
        url: url,
        method: 'GET'
    }, function (error, response, body) {
        packetparser.GetRtAllMesureValue(body);
    });
}

module.exports.InnMesure = function (request, localname) {

    var url =
        configparser.GetOptionURL() + '/'
        + configparser.GetOptionFeature() + '/'
        + configparser.GetInnMesureFeature() + '?'
        + configparser.GetInnMesureParam() + '&ServiceKey='
        + configparser.GetOptionServiceKey();

    var name = encodeURI(localname);
    var url = url.replace("localname", name);

    request({
        url: url,
        method: 'GET'
    }, function (error, response, body) {
        packetparser.GetRtInnMesureValue(body, localname);
    });
}