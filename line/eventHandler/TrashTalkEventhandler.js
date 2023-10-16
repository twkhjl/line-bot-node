const lineReplyHandler = require("../ReplyHandler");
const TrashTalkModel = require("../../models/TrashTalkModel");
const commandObj = require("../command");
const dateTimeHelper = require("../../helpers/dateTimeHelper");

const TrashTalkEventHandler = async function (client, event) {


    // 學幹話
    if (commandObj.learnTrashTalk.regex.exec(event.message.text)) {
        const regex = new RegExp(commandObj.learnTrashTalk.regex);
        const outputArr = regex.exec(event.message.text);
        const title = outputArr[1];
        const body = outputArr[2];

        let checkTitleExistHasErr = 0;
        const isExist = await TrashTalkModel.checkTitleExist(title, event.source.groupId).catch(err => {
            checkTitleExistHasErr = 1;
            console.log(err);
        });
        if (checkTitleExistHasErr) return;


        if (isExist >= 1) {
            const outputMsg = "這句已經學過惹";
            return lineReplyHandler.replyWithText(client, event, outputMsg);
        }

        const data = {
            group_id: event.source.groupId,
            title: title,
            body: body,
            created_at: dateTimeHelper.getCurrentTimeString(),
        };

        let insertHasErr = 0;
        const queryResult = await TrashTalkModel.insert(data).catch(err => {
            insertHasErr = 1;
            console.log(err);
        });
        if (insertHasErr) return;


        if (queryResult.insertId) {
            const outputMsg = "好喔,學起來惹";
            return lineReplyHandler.replyWithText(client, event, outputMsg);
        }

        return;

    }

    // 講幹話
    if (commandObj.talkTrash.regex.exec(event.message.text)) {
        const regex = new RegExp(commandObj.talkTrash.regex);
        const outputArr = regex.exec(event.message.text);

        const title = outputArr[1];

        let getOneByTitleAndGroupIDErr = 0;
        const queryResult = await TrashTalkModel.getOneByTitleAndGroupID(title, event.source.groupId).catch(err => {
            getOneByTitleAndGroupIDErr = 1;
            return console.log(err);
        });
        if (getOneByTitleAndGroupIDErr) return;

        if (!queryResult || queryResult.length <= 0) {
            const outputMsg = "這句我沒學過0.0";
            return lineReplyHandler.replyWithText(client, event, outputMsg);

        }

        if (queryResult && queryResult[0] && queryResult[0].body) {
            const outputMsg = queryResult[0].body;
            return lineReplyHandler.replyWithText(client, event, outputMsg);
        }
        return;

    }

    // 刪除特定幹話
    if (commandObj.removeOneTrashTalk.regex.exec(event.message.text)) {
        const regex = new RegExp(commandObj.removeOneTrashTalk.regex);
        const outputArr = regex.exec(event.message.text);
        const title = outputArr[1];

        let checkTitleExistHasErr = 0;
        const isExist = await TrashTalkModel.checkTitleExist(title, event.source.groupId).catch(err => {
            checkTitleExistHasErr = 1;
            console.log(err);
        });
        if (checkTitleExistHasErr) return;

        if (isExist <= 0) {
            const outputMsg = "這句我沒學過,不用刪辣";
            return lineReplyHandler.replyWithText(client, event, outputMsg);
        }

        const data = {
            group_id: event.source.groupId,
            title: title,
        };

        let removeOneFromGroupErr = 0;
        await TrashTalkModel.removeOneFromGroup(data).catch(err => {
            removeOneFromGroupErr = 1;
            return console.log(err);
        });
        if (removeOneFromGroupErr) return;

        const outputMsg = `好喔,我把"${title}"忘掉惹`;
        return lineReplyHandler.replyWithText(client, event, outputMsg);

    }

    // 刪除所有幹話
    if (commandObj.removeAllTrashTalk.regex.exec(event.message.text)) {

        const data = {
            group_id: event.source.groupId,
        };

        let removeAllFromGroupErr = 0;
        TrashTalkModel.removeAllFromGroup(data).catch(err => {
            removeAllFromGroupErr = 1;
            return console.log(err);
        });
        if (removeAllFromGroupErr) return;

        const outputMsg = "好喔,我全部忘光光惹>_<";
        return lineReplyHandler.replyWithText(client, event, outputMsg);

    }

}


module.exports = TrashTalkEventHandler;