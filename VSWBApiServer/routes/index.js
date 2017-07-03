'use strict';

const
    express = require('express'),
    router = express.Router(),
    bot = require('../service/botService'),
    init = require('../service/init');

let defaultButton;

console.log('APIs initialize');
init.initAreaButton();

let postMessage = (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    const _obj = {
        user_key: req.body.user_key,
        type: req.body.type,
        content: req.body.content
    };

    if (_obj.content === "종합") {
        console.log(defaultButton);
        bot.total((err, result) => {
            let massage = {
                "message": {
                    "text": result
                },
                "keyboard": {
                    "type": "buttons",
                    "buttons": defaultButton
                }
            };
            res.set({
                'content-type': 'application/json'
            }).send(JSON.stringify(massage));
            console.log(massage);
        });
    } else if (_obj.content === "마지막검색") {
        let massage = {
            "message": {
                "text": "마지막 검색 내용이 없습니다."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": defaultButton
            }
        };
        res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify(massage));
        console.log(massage);
    } else {
        init.getMainButtonList((err, result) => {
            if (result.indexOf(_obj.content) !== -1) {
                init.getDetailButtonList(_obj.content, (err, result) => {
                    let massage = {
                        "message": {
                            "text": '세부 지역을 골라주세요.'
                        },
                        "keyboard": {
                            "type": "buttons",
                            "buttons": result
                        }
                    };
                    res.set({
                        'content-type': 'application/json'
                    }).send(JSON.stringify(massage));
                    console.log(massage);
                });
            } else {
                init.getMainArea(_obj.content, (err, result) => {
                    console.log("init.getMainArea");
                    bot.deatailSearch(result, _obj.content, (err, result) => {
                        let massage = {
                            "message": {
                                "text": result
                            },
                            "keyboard": {
                                "type": "buttons",
                                "buttons": defaultButton
                            }
                        };
                        res.set({
                            'content-type': 'application/json'
                        }).send(JSON.stringify(massage));
                        console.log(massage);
                    });
                });
            }
        });
    }
};

router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/keyboard', (req, res) => {

    init.getMainButtonList((err, result) => {
        defaultButton = result;

        var retrunVal = {
            type: 'buttons',
            buttons: result
        };
        res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify(retrunVal));
        console.log(retrunVal);
    });
});

router.post('/message', postMessage);

router.post('/friend', (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const objFriend = {
        user_key: req.body.user_key,
    };
    console.log("친구 추가");
    console.log(objFriend);
});

router.delete('/friend', (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const objFriend = {
        user_key: req.body.user_key,
    };
    console.log("친구 삭제");
    console.log(objFriend);
});

router.delete('/chat_room', (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const objFriend = {
        user_key: req.body.user_key,
    };
    console.log("채팅방 나가기");
    console.log(objFriend);
});


module.exports = router;