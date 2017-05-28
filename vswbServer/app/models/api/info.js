var mongoose = require('mongoose');

var infoSchema = mongoose.Schema(
    {
        locallist: [
            {
                cityname : String
            }
        ],
        citycount: {
            seoul: { type: Number, min: 0 },
            gyeonggi: { type: Number, min: 0 },
            busan: { type: Number, min: 0 },
            daegu: { type: Number, min: 0 },
            gangwon: { type: Number, min: 0 },
            jeju: { type: Number, min: 0 },
        },
        app: {
            version: String
        }
    }
);

module.exports = mongoose.model('Infos', infoSchema);
