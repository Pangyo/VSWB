var mongoose = require('mongoose');
var citySchema = mongoose.Schema(
    {
        city: {
            updated     : String,
            localname   : String,
            cityname    : String,
            so2value    : String,
            covalue     : String,
            o3value     : String,
            no2value    : String,
            pm10value   : String,
            pm25value   : String,
        }
    }
);

module.exports.GetCityCollection = function (cname) {
    var name = 'Citys_' + cname;
    return mongoose.model(name, citySchema);
}