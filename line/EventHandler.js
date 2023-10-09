const TrashTalkModel = require("../models/TrashTalkModel");
const MessageRecordModel = require("../models/MessageRecordModel");

const dateTimeHelper = require("../helpers/dateTimeHelper");

// event handler
const EventHandler = function (client, event) {

    // 紀錄群組對話
    if (event.type == 'message' && event.message.type == 'text' && event.source.groupId) {

        const data = {
            group_id: event.source.groupId,
            user_id: event.source.userId,
            message_type: event.message.type,
            message: event.message.text,
            created_at: dateTimeHelper.getCurrentTimeString(),

        };

        MessageRecordModel.insert(data).then(res => {
        }).catch(err => {
        });
    }

    const regexObj = {
        "learnTrashTalk": /mic學幹話 (.+):(.+)/gm,
        "talkTrash": /mic (.+)/gm,
    }
    const reqText = event.message.text;

    const catchErrFunction = (client, event, err) => {
        const outputMsg = "發生錯誤,請找相關人員處理";
        console.log(err);
        const echo = { type: 'text', text: outputMsg };
        return client.replyMessage(event.replyToken, echo);
    };

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
            group_id: event.source.groupId,
            user_id: event.source.userId,
            title: title,
            body: body,
            created_at: dateTimeHelper.getCurrentTimeString(),

        };


        TrashTalkModel.insert(data).then(res => {

            const outputMsg = "好喔,學起來惹";
            const echo = { type: 'text', text: outputMsg };
            return client.replyMessage(event.replyToken, echo);
        }).catch(err => {
            return catchErrFunction(client, event, err);
        });
        return;

    }

    // 講幹話
    if (regexObj.talkTrash.exec(reqText)) {
        const regex = new RegExp(regexObj.talkTrash);
        const outputArr = regex.exec(reqText);

        const title = outputArr[1];
        const group_id = event.source.groupId;

        TrashTalkModel.getOneByTitleAndGroupID(title,group_id).then(res => {
            
            let text = "";
            text="這句我沒學過0.0";
            if(res && res[0] && res[0].body){
                text = res[0].body;
            }

            const echo = { type: 'text', text: text };
            return client.replyMessage(event.replyToken, echo);
        }).catch(err => {
            return catchErrFunction(client, err);
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

module.exports = EventHandler