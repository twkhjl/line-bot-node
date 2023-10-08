require('dotenv').config();

const db = require("./database/DB");



const line = require('@line/bot-sdk');
const express = require('express');

// start mySQL
const mysql = require('mysql');


function select(options) {
    const tableName = options.tableName;

    const data = options.data;
    let sql = `select * from ${tableName} where `;
    let whereStr = "";
    for (let [key, values] of Object.entries(data)) {
        whereStr += ` ${key} = ? `;
    }

    const finalSql = sql + whereStr + ";";

    const args = Object.values(data);

    return new Promise((resolve, reject) => {
        db.query(finalSql, args, (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });

    db.query(finalSql, args, function (err, result) {
        if (err) {
            console.error(err);
            return err;
        }
        return result;
        // console.error(result);
    });
    return 123;


}

function insert(options) {
    const tableName = options.tableName;

    // let tableName = "trash_talk";
    // const item = {
    //     group_id: '',
    //     user_id: '',
    //     title: 'HI',
    //     body: 'this'
    // };


    const item = options.data;

    let query = db.query(`insert into ${tableName} set ?`, item, function (err, result) {
        if (err) {
            console.error(err);
            return;
        }
        console.error(result);
    });
    return query;
}


// create LINE SDK config from env variables
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

// event handler
function handleEvent(event) {
    // if (event.type !== 'message' || event.message.type !== 'text') {
    //     // ignore non-text-message event
    //     return Promise.resolve(null);
    // }

    const regexObj = {
        "learnTrashTalk": /mic學幹話 (.+):(.+)/gm,
        "talkTrash": /mic (.+)/gm,
    }
    const reqText = event.message.text;

    if (event.message.text == 'groupid') {
        return console.log(event.source.groupId);
    }
    if (event.message.text == 'userid') {
        return console.log(event.source.userId);
    }

    // 學幹話
    if (regexObj.learnTrashTalk.exec(reqText)) {
        const regex = new RegExp(regexObj.learnTrashTalk);
        const outputArr = regex.exec(reqText);
        const title = outputArr[1];
        const body = outputArr[2];
        const data = {
            tableName: 'trash_talk',
            data: {
                // group_id: '',
                // user_id: '',
                title: title,
                body: body,

            }
        };
        const result = insert(data);

        const echo = { type: 'text', text: "好喔,學起來惹" };
        return client.replyMessage(event.replyToken, echo);
    }

    // 講幹話
    if (regexObj.talkTrash.exec(reqText)) {
        const regex = new RegExp(regexObj.talkTrash);
        const outputArr = regex.exec(reqText);

        const title = outputArr[1];

        const data = {
            tableName: 'trash_talk',
            data: {
                // group_id: '',
                // user_id: '',
                title: title,

            }
        };
        select(data).then(res => {
            const text = res[0].body;
            const echo = { type: 'text', text: text };
            return client.replyMessage(event.replyToken, echo);
        });
        return;

    }


    // 梗圖
    if (event.message.text == 'mic我要看梗圖') {
        const imgMsgObj = {
            "type": "image",
            "originalContentUrl": `https://i.imgur.com/ecfaZLc.jpeg`,
            "previewImageUrl": `https://i.imgur.com/ecfaZLc.jpeg`,
            "animated": true
        }
        const echo = imgMsgObj;
        return client.replyMessage(event.replyToken, echo);
    }


}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});