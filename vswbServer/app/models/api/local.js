var mongoose = require('mongoose');

var localSchema = mongoose.Schema(
    {
        local: {
            updated:            String,
            seoul:      { type: Number, min: 0 },
            busan:      { type: Number, min: 0 },
            daegu:      { type: Number, min: 0 },
            incheon:    { type: Number, min: 0 },
            gwangju:    { type: Number, min: 0 },
            daejeon:    { type: Number, min: 0 },
            ulsan:      { type: Number, min: 0 },
            gyeonggi:   { type: Number, min: 0 },
            gangwon:    { type: Number, min: 0 },
            chungbuk:   { type: Number, min: 0 },
            chungnam:   { type: Number, min: 0 },
            jeonbuk:    { type: Number, min: 0 },
            jeonnam:    { type: Number, min: 0 },
            gyeongbuk:  { type: Number, min: 0 },
            gyeongnam:  { type: Number, min: 0 },
            jeju:       { type: Number, min: 0 },
            sejong:     { type: Number, min: 0 }
        }
    }
);

module.exports = mongoose.model('Locals', localSchema);