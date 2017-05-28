var iniparser = require('iniparser');
var config = iniparser.parseSync('./system/kakaoKey.ini');

// Option
module.exports.GetOptionAppKey = function () {
    return config.Option.APP_KEY;
}

module.exports.GetOptionAppSecret = function () {
    return config.Option.APP_SECRET;
}