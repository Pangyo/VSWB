var iniparser = require('iniparser');
var config = iniparser.parseSync('../vswbServer/system/vswbServer.ini');

// Option
module.exports.GetOptionURL = function () {
    return config.Option.Url;
}

module.exports.GetOptionFeature = function () {
    return config.Option.Feature;
}

module.exports.GetOptionServiceKey = function () {
    return config.Option.ServiceKey;
}

// AllMesure
module.exports.GetAllMesureFeature = function () {
    return config.AllMesure.Feature;
}

module.exports.GetAllMesureParam = function () {
    return config.AllMesure.Param;
}

// InnMesure
module.exports.GetInnMesureFeature = function () {
    return config.InnMesure.Feature;
}

module.exports.GetInnMesureParam = function () {
    return config.InnMesure.Param;
}

// DB
module.exports.GetDBUrl = function () {
    return config.DB.Url;
}