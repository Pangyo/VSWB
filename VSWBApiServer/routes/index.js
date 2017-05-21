'use strict';

const
    express = require('express'),
    router = express.Router(),
    Bot = require('../service/BotService');

let defaultButton = {
        "type": "buttons",
        "buttons": ["종합", "경기 성남"]
    };

console.log('APIs initialize');

let getKeyboard = (req, res) => {   
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
//  res.json({
//    "type" : "text"
//  });
    res.json(defaultButton);

  return res;
};

let postMessage = (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    const _obj = {
        user_key: req.body.user_key,
        type: req.body.type,
        content: req.body.content
    };

    Bot.region(_obj.content, (err, result) => {
        if (!err) {
            res.json(
                {
                    message: {text: result},
                    "keyboard": defaultButton
                });
        } else {
            res.json({message: {text: '문제가 생겼습니다.'}});
        }
    });

    return res;
};

router.get('/', function (req, res) {
    res.render('index', {title: 'Express'});
});

router.get('/keyboard', getKeyboard);

router.post('/message', postMessage);

router.post('/friend', (req, res)=>{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const objFriend = {
        user_key: req.body.user_key,
    };
    console.log("친구 추가");
    console.log(objFriend);
});

router.delete('/friend', (req, res)=>{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const objFriend = {
        user_key: req.body.user_key,
    };
    console.log("친구 삭제");
    console.log(objFriend);
});

router.delete('/chat_room', (req, res)=>{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const objFriend = {
        user_key: req.body.user_key,
    };
    console.log("채팅방 나가기");
    console.log(objFriend);
});


module.exports = router;
