const fs = require('fs');

const init = {};
let initData;
const DEFAULT_BUTTON = ["종합", "마지막검색"];

init.initAreaButton = () => {
    fs.readFile('./service/AreaList.json', 'utf8', function(error, data) {
        initData = JSON.parse(data);
        console.log("Init.initAreaButton SUCCESS!");
    });
};

init.getMainButtonList = (callback) => {
    var mainButton = new Array;
    for (var i in DEFAULT_BUTTON) {
        mainButton.push(DEFAULT_BUTTON[i]);
    }
    for (var i in initData) {
        mainButton.push(i);
    }
    callback(null, mainButton);
};

init.getDetailButtonList = (content, callback) => {
    var detailButton = new Array;
    for (var i in initData[content]) {
        detailButton.push(initData[content][i]);
    }
    callback(null, detailButton);
};

init.getMainArea = (content, callback) => {
    for (var i in initData) {
        if (initData[i].indexOf(content) !== -1) {
            callback(null, i);
        }
    }
};

module.exports = init;