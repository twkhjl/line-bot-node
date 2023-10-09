const TrashTalkModel = require("../models/TrashTalkModel");
const MessageRecordModel = require("../models/MessageRecordModel");
const UserModel = require("../models/UserModel");
const ImgModel = require("../models/ImgModel");

const lineApiHandler = require("../line/ApiHandler");

const dateTimeHelper = require("../helpers/dateTimeHelper");
const strHelper = require("../helpers/strHelper");
const readme = require("./readme");

// event handler
const EventHandler = async function (client, event) {

    let reqText = "";

    if (event.type !== 'message' || event.message.type !== 'text' || !event.source.groupId) {
        return;
    }
    // 紀錄群組對話
    if (event.type == 'message' && event.message.type == 'text' && event.source.groupId) {
        reqText = event.message.text;


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
        "learnTrashTalk": /^mic學幹話 (.+):(.+)$/gm,
        "talkTrash": /^mic (.+)/gm,
        "removeAllTrashTalk": /^mic幹話忘光光$/gm,
        "removeOneTrashTalk": /^mic給我忘記這句 (.+)$/gm,
        "readme": /^mic怎麼用$/,
        "search": {
            "youtube": /^mic搜yt (.+)$/,
            "google": /^mic搜google (.+)$/,
        },
    }

    const catchErrFunction = (client, event, err) => {
        const outputMsg = "發生錯誤,請找相關人員處理";
        console.log(err);
        const echo = { type: 'text', text: outputMsg };
        return client.replyMessage(event.replyToken, echo);
    };

    if (event.message.text == 'groupid') {
        const groupId = event.source.groupId;
        lineApiHandler.groupSummary(event.source.groupId).then(res => {
            return console.log(res);
        })
        return;
    }

    // 顯示教學
    if (reqText == "mic怎麼用") {

        const echo = { type: 'text', text: readme };
        return client.replyMessage(event.replyToken, echo);
        return;
    }


    // 將使用者資料新增/更新置資料庫
    if (event.source.userId && event.source.groupId) {
        const userId = event.source.userId;
        const userProfile = await (lineApiHandler.userProfile(event.source.userId));
        if (!userProfile.userId) {
            return;
        }

        const resultGetUserById = await (UserModel.getOneByUserID(userId));


        let job = "";
        let data = {};
        if (!resultGetUserById || resultGetUserById.length <= 0) {
            job = "insert";
            for (let [k, v] of Object.entries(userProfile)) {
                if (["language"].indexOf(k) == -1 && v) {
                    const keyToSnakeCase = strHelper.camelToSnakeCase(k);
                    data[keyToSnakeCase] = v;
                }
            }
        }

        if (resultGetUserById && resultGetUserById[0]) {
            job = "update";
            data.dataToUpdate = {};
            for (let [k, v] of Object.entries(resultGetUserById[0])) {
                if (["id", "user_id", "created_at", "updated_at"].indexOf(k) == -1 && v) {
                    data["dataToUpdate"][k] = v;
                }
            }
            data.userId = resultGetUserById[0]['user_id'];
        }
        let output = {
            job: job,
            data: data
        }


        const queryResult = UserModel[output.job](output.data);

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

        TrashTalkModel.getOneByTitleAndGroupID(title, group_id).then(res => {

            let text = "";
            text = "這句我沒學過0.0";
            if (res && res[0] && res[0].body) {
                text = res[0].body;
            }

            const echo = { type: 'text', text: text };
            return client.replyMessage(event.replyToken, echo);
        }).catch(err => {
            return catchErrFunction(client, err);
        });
        return;

    }

    // 刪除特定幹話
    if (regexObj.removeOneTrashTalk.exec(reqText)) {
        const regex = new RegExp(regexObj.removeOneTrashTalk);
        const outputArr = regex.exec(reqText);
        const title = outputArr[1];

        const data = {
            group_id: event.source.groupId,
            title: title,

        };


        TrashTalkModel.removeOneFromGroup(data).then(res => {
            const outputMsg = `好喔,我把 ${title}忘掉惹`;
            const echo = { type: 'text', text: outputMsg };
            return client.replyMessage(event.replyToken, echo);
        }).catch(err => {
            return catchErrFunction(client, event, err);
        });
        return;

    }

    // 刪除所有幹話
    if (regexObj.removeAllTrashTalk.exec(reqText)) {
        const regex = new RegExp(regexObj.learnTrashTalk);
        const outputArr = regex.exec(reqText);

        const data = {
            group_id: event.source.groupId,
            user_id: event.source.userId,

        };


        TrashTalkModel.removeAllFromGroup(data).then(res => {
            const outputMsg = "好喔,我全部忘光光惹>_<";
            const echo = { type: 'text', text: outputMsg };
            return client.replyMessage(event.replyToken, echo);
        }).catch(err => {
            return catchErrFunction(client, event, err);
        });
        return;

    }


    // 梗圖
    if (event.message.text == 'mic我要看梗圖') {

        const groupId = event.source.groupId;

        const rawResult = await ImgModel.getRandomByGroupID(groupId);
        if (!rawResult || !rawResult[0]) return;
        const randomImg = rawResult[0];


        const imgMsgObj = {
            "type": "image",
            "originalContentUrl": randomImg.original_content_url,
            "previewImageUrl": randomImg.preview_image_url,
            "animated": true
        }
        const echo = imgMsgObj;
        return client.replyMessage(event.replyToken, echo);
    }

    // 搜索youtube
    //https://www.youtube.com/results?search_query=
    if (regexObj.search.youtube.exec(reqText)) {

        const regex = new RegExp(regexObj.search.youtube);
        const outputArr = regex.exec(reqText);
        const keyword = outputArr[1];
        const searchurl = "https://www.youtube.com/results?search_query=" + keyword;


        const outputMsg = searchurl;
        const echo = { type: 'text', text: outputMsg };
        return client.replyMessage(event.replyToken, echo);

    }

    // 搜google
    // https://www.google.com/search?q=
    if (regexObj.search.google.exec(reqText)) {

        const regex = new RegExp(regexObj.search.google);
        const outputArr = regex.exec(reqText);
        const keyword = outputArr[1];
        const searchurl = "https://www.google.com/search?q=" + keyword;


        const outputMsg = searchurl;
        const echo = { type: 'text', text: outputMsg };
        return client.replyMessage(event.replyToken, echo);

    }




}

module.exports = EventHandler