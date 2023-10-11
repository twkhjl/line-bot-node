const TrashTalkModel = require("../models/TrashTalkModel");
const MessageRecordModel = require("../models/MessageRecordModel");
const ImgModel = require("../models/ImgModel");

const dateTimeHelper = require("../helpers/dateTimeHelper");

const lineApiHandler = require("./ApiHandler");
const linReplyHandler = require("./ReplyHandler");
const readme = require("./readme");
const ApiHandler = require("./ApiHandler");

const weatherDataHandler = require("../API/weather/DataHandler");

const gameGuessNumber = require("../games/guessNumber");
const numHelper = require("../helpers/numHelper");

// event handler
const EventHandler = async function (client, event) {

    const eventMessageText = event.message && event.message.text ? event.message.text : "";
    const eventMessageType = event.message && event.message.type ? event.message.type : "";

    const userId = event.source && event.source.userId ? event.source.userId : "";
    const groupId = event.source && event.source.groupId ? event.source.groupId : "";

    if (eventMessageText == "mic終極密碼開始"
        && !gameGuessNumber.isCurrentlyPlaying(groupId)
    ) {
        gameGuessNumber.groupData.push({
            groupId: groupId,
            phase: "decideMaxNum",
        })
        const outputMsg = "好喔,請輸入最大數字:";
        return linReplyHandler.replyWithText(client, event, outputMsg);


    }
    if (gameGuessNumber.isPhaseDecideMaxNum(groupId, eventMessageText)
        && numHelper.isPositiveInteger(eventMessageText)
        && !gameGuessNumber.isValidMaxNum(eventMessageText)) {

        const outputMsg = "數字太大惹,請不要超過500";
        return linReplyHandler.replyWithText(client, event, outputMsg);
    }

    if (gameGuessNumber.isPhaseDecideMaxNum(groupId, eventMessageText)
        && gameGuessNumber.isValidMaxNum(eventMessageText)) {

        const index = gameGuessNumber.findIndexByGroupId(groupId);
        const randomNumber = numHelper.generateRndomNumber(eventMessageText);
        gameGuessNumber.groupData[index].correctNumber = randomNumber;
        if (!randomNumber) gameGuessNumber.groupData[index].correctNumber = 1;

        gameGuessNumber.groupData[index].maxNumber = eventMessageText * 1;
        gameGuessNumber.groupData[index].minNumber = 1;
        gameGuessNumber.groupData[index].phase = "guessing";
        console.log(gameGuessNumber.groupData[index]);
        const minNumber = gameGuessNumber.groupData[index].minNumber;

        const outputMsg = `遊戲開始,數字為${minNumber}~${eventMessageText}`;
        return linReplyHandler.replyWithText(client, event, outputMsg);

    }

    if (gameGuessNumber.isPhaseGuessing(groupId, eventMessageText)
        && numHelper.isPositiveInteger(eventMessageText)
        && !gameGuessNumber.isInputNumberCorrect(groupId, eventMessageText)) {

        const guessNumber = eventMessageText * 1;

        const index = gameGuessNumber.findIndexByGroupId(groupId);
        const correctNumber = gameGuessNumber.groupData[index].correctNumber;


        let outputMsg = '';


        if (gameGuessNumber.groupData[index].minNumber > guessNumber
            || guessNumber > gameGuessNumber.groupData[index].maxNumber) {

            outputMsg = `請猜${gameGuessNumber.groupData[index].minNumber}~${gameGuessNumber.groupData[index].maxNumber}之間的數字 ^_^|||`;
            return linReplyHandler.replyWithText(client, event, outputMsg);

        }

        if (gameGuessNumber.groupData[index].minNumber < guessNumber
            && guessNumber < correctNumber
        ) {

            gameGuessNumber.groupData[index].minNumber = guessNumber + 1;
            console.log(gameGuessNumber.groupData[index]);

            const minNumber = gameGuessNumber.groupData[index].minNumber;
            const maxNumber = gameGuessNumber.groupData[index].maxNumber;
            if (minNumber == maxNumber && maxNumber == correctNumber) {
                gameGuessNumber.groupData.splice(index, 1);

                outputMsg = `沒猜中~正確數字為${correctNumber}~遊戲結束,下次再接再勵~`;
                return linReplyHandler.replyWithText(client, event, outputMsg);
            }

            outputMsg = `差一點,數字為${gameGuessNumber.groupData[index].minNumber}~${gameGuessNumber.groupData[index].maxNumber}`;
            return linReplyHandler.replyWithText(client, event, outputMsg);

        }
        if (correctNumber < guessNumber
            && guessNumber < gameGuessNumber.groupData[index].maxNumber
        ) {

            gameGuessNumber.groupData[index].maxNumber = guessNumber - 1;
            console.log(gameGuessNumber.groupData[index]);

            const minNumber = gameGuessNumber.groupData[index].minNumber;
            const maxNumber = gameGuessNumber.groupData[index].maxNumber;
            if (minNumber == maxNumber && maxNumber == correctNumber) {
                gameGuessNumber.groupData.splice(index, 1);

                outputMsg = `沒猜中~正確數字為${correctNumber}~遊戲結束,下次再接再勵~`;
                return linReplyHandler.replyWithText(client, event, outputMsg);
            }


            outputMsg = `差一點,數字為${gameGuessNumber.groupData[index].minNumber}~${gameGuessNumber.groupData[index].maxNumber}`;
            return linReplyHandler.replyWithText(client, event, outputMsg);

        }
        if (gameGuessNumber.groupData[index].minNumber == guessNumber) {


            gameGuessNumber.groupData[index].minNumber = guessNumber + 1;
            console.log(gameGuessNumber.groupData[index]);

            const minNumber = gameGuessNumber.groupData[index].minNumber;
            const maxNumber = gameGuessNumber.groupData[index].maxNumber;
            if (minNumber == maxNumber && maxNumber == correctNumber) {
                gameGuessNumber.groupData.splice(index, 1);

                outputMsg = `沒猜中~正確數字為${correctNumber}~遊戲結束,下次再接再勵~`;
                return linReplyHandler.replyWithText(client, event, outputMsg);
            }

            outputMsg = `差一點,數字為${gameGuessNumber.groupData[index].minNumber}~${gameGuessNumber.groupData[index].maxNumber}`;
            return linReplyHandler.replyWithText(client, event, outputMsg);

        }
        if (gameGuessNumber.groupData[index].maxNumber == guessNumber) {


            gameGuessNumber.groupData[index].maxNumber = guessNumber - 1;
            console.log(gameGuessNumber.groupData[index]);

            const minNumber = gameGuessNumber.groupData[index].minNumber;
            const maxNumber = gameGuessNumber.groupData[index].maxNumber;
            if (minNumber == maxNumber && maxNumber == correctNumber) {
                gameGuessNumber.groupData.splice(index, 1);

                outputMsg = `沒猜中~正確數字為${correctNumber}~遊戲結束,下次再接再勵~`;
                return linReplyHandler.replyWithText(client, event, outputMsg);
            }

            outputMsg = `差一點,數字為${gameGuessNumber.groupData[index].minNumber}~${gameGuessNumber.groupData[index].maxNumber}`;
            return linReplyHandler.replyWithText(client, event, outputMsg);

        }



    }


    if (gameGuessNumber.isPhaseGuessing(groupId, eventMessageText)
        && gameGuessNumber.isInputNumberCorrect(groupId, eventMessageText)) {

        const index = gameGuessNumber.findIndexByGroupId(groupId);
        gameGuessNumber.groupData.splice(index, 1);
        console.log(gameGuessNumber.groupData);

        const outputMsg = `猜中了!!!你好棒!!!!`;
        return linReplyHandler.replyWithText(client, event, outputMsg);

    }
    if (eventMessageText == "mic終極密碼結束"
        && gameGuessNumber.isCurrentlyPlaying(groupId)) {
        const index = gameGuessNumber.findIndexByGroupId(groupId);
        gameGuessNumber.groupData.splice(index, 1);

        const outputMsg = `好喔,終極密碼遊戲結束`;
        return linReplyHandler.replyWithText(client, event, outputMsg);


    }
    if (eventMessageText == "mic終極密碼結束"
        && !gameGuessNumber.isCurrentlyPlaying(groupId)) {

        const outputMsg = `你冷靜,現在沒有進行中的終極密碼遊戲`;
        return linReplyHandler.replyWithText(client, event, outputMsg);


    }

    // linebot僅限群組使用
    if (!groupId) {
        return;
    }
    // 紀錄群組對話
    if (event.type == 'message' && eventMessageType == 'text' && groupId) {

        const data = {
            group_id: groupId,
            user_id: userId,
            message_type: eventMessageType,
            message: eventMessageText,
            created_at: dateTimeHelper.getCurrentTimeString(),

        };

        let userProfileErr = 0;
        let userProfile = null;
        if (userId) {
            userProfile = await ApiHandler.userProfile(userId).catch(err => {
                userProfileErr = 1;
                console.log(err);
                return;
            })
        }

        if (userProfile && userProfile.displayName) {
            data.display_name = userProfile.displayName;
        }

        await MessageRecordModel.insert(data).catch(err => {
            return console.log(err);
        });
    }

    // line bot指令
    const commandObj = require("./command");

    // 取得群組id用
    if (eventMessageText == 'groupid' && groupId) {

        let groupSummaryErr = 0;
        const output = await lineApiHandler.groupSummary(groupId).catch(() => {
            groupSummaryErr = 1;
            return console.log("err")
        });
        if (groupSummaryErr) return;
        return console.log(output);
    }

    // 顯示教學
    if (commandObj.readme.exec(eventMessageText)) {
        const outputMsg = readme;
        return linReplyHandler.replyWithText(client, event, outputMsg);
    }

    // 學幹話
    if (commandObj.learnTrashTalk.exec(eventMessageText)) {
        const regex = new RegExp(commandObj.learnTrashTalk);
        const outputArr = regex.exec(eventMessageText);
        const title = outputArr[1];
        const body = outputArr[2];

        let checkTitleExistHasErr = 0;
        const isExist = await TrashTalkModel.checkTitleExist(title, groupId).catch(err => {
            checkTitleExistHasErr = 1;
            console.log(err);
        });
        if (checkTitleExistHasErr) return;


        if (isExist >= 1) {
            const outputMsg = "這句已經學過惹";
            return linReplyHandler.replyWithText(client, event, outputMsg);
        }

        const data = {
            group_id: groupId,
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
            return linReplyHandler.replyWithText(client, event, outputMsg);
        }

        return;

    }

    // 講幹話
    if (commandObj.talkTrash.exec(eventMessageText)) {
        const regex = new RegExp(commandObj.talkTrash);
        const outputArr = regex.exec(eventMessageText);

        const title = outputArr[1];

        let getOneByTitleAndGroupIDErr = 0;
        const queryResult = await TrashTalkModel.getOneByTitleAndGroupID(title, groupId).catch(err => {
            getOneByTitleAndGroupIDErr = 1;
            return console.log(err);
        });
        if (getOneByTitleAndGroupIDErr) return;

        if (!queryResult || queryResult.length <= 0) {
            const outputMsg = "這句我沒學過0.0";
            return linReplyHandler.replyWithText(client, event, outputMsg);

        }

        if (queryResult && queryResult[0] && queryResult[0].body) {
            const outputMsg = queryResult[0].body;
            return linReplyHandler.replyWithText(client, event, outputMsg);
        }
        return;

    }

    // 刪除特定幹話
    if (commandObj.removeOneTrashTalk.exec(eventMessageText)) {
        const regex = new RegExp(commandObj.removeOneTrashTalk);
        const outputArr = regex.exec(eventMessageText);
        const title = outputArr[1];

        let checkTitleExistHasErr = 0;
        const isExist = await TrashTalkModel.checkTitleExist(title, groupId).catch(err => {
            checkTitleExistHasErr = 1;
            console.log(err);
        });
        if (checkTitleExistHasErr) return;

        if (isExist <= 0) {
            const outputMsg = "這句我沒學過,不用刪辣";
            return linReplyHandler.replyWithText(client, event, outputMsg);
        }

        const data = {
            group_id: groupId,
            title: title,
        };

        let removeOneFromGroupErr = 0;
        await TrashTalkModel.removeOneFromGroup(data).catch(err => {
            removeOneFromGroupErr = 1;
            return console.log(err);
        });
        if (removeOneFromGroupErr) return;

        const outputMsg = `好喔,我把"${title}"忘掉惹`;
        return linReplyHandler.replyWithText(client, event, outputMsg);

    }

    // 刪除所有幹話
    if (commandObj.removeAllTrashTalk.exec(eventMessageText)) {

        const data = {
            group_id: groupId,
        };

        let removeAllFromGroupErr = 0;
        TrashTalkModel.removeAllFromGroup(data).catch(err => {
            removeAllFromGroupErr = 1;
            return console.log(err);
        });
        if (removeAllFromGroupErr) return;

        const outputMsg = "好喔,我全部忘光光惹>_<";
        return linReplyHandler.replyWithText(client, event, outputMsg);

    }


    // 隨機梗圖
    if (commandObj.showRandomImg.exec(eventMessageText)) {

        let getRandomImgErr = 0;
        const randomImg = await ImgModel.getRandomImg().catch(err => {
            removeAllFromGroupErr = 1;
            return console.log(err);
        });
        if (getRandomImgErr) return;;

        if (!randomImg || !randomImg.original_content_url || !randomImg.preview_image_url) return;

        return linReplyHandler.replyWithImg(client, event, randomImg.original_content_url, randomImg.preview_image_url);

    }

    // 搜索youtube
    //https://www.youtube.com/results?search_query=
    if (commandObj.search.youtube.exec(eventMessageText)) {

        const regex = new RegExp(commandObj.search.youtube);
        const outputArr = regex.exec(eventMessageText);
        const keyword = outputArr[1];
        const outputMsg = "https://www.youtube.com/results?search_query=" + keyword;

        return linReplyHandler.replyWithText(client, event, outputMsg);


    }

    // 搜google
    // https://www.google.com/search?q=
    if (commandObj.search.google.exec(eventMessageText)) {

        const regex = new RegExp(commandObj.search.google);
        const outputArr = regex.exec(eventMessageText);
        const keyword = outputArr[1];
        const outputMsg = "https://www.google.com/search?q=" + keyword;

        return linReplyHandler.replyWithText(client, event, outputMsg);

    }

    // google導航
    // https://www.google.com.tw/maps/dir/地點1/地點2
    if (commandObj.search.googleMap.exec(eventMessageText)) {

        const regex = new RegExp(commandObj.search.googleMap);
        const outputArr = regex.exec(eventMessageText);
        const startLocation = outputArr[1];
        const goal = outputArr[2];
        const outputMsg = `https://www.google.com.tw/maps/dir/${startLocation}/${goal}`;

        return linReplyHandler.replyWithText(client, event, outputMsg);


    }

    // 查詢高雄特定行政區明天降雨機率
    if (commandObj.showRainfullRate.exec(eventMessageText)) {
        const regex = new RegExp(commandObj.showRainfullRate);
        const outputArr = regex.exec(eventMessageText);
        let districtKeyword = outputArr[1];


        if (!districtKeyword.includes("區")) {
            districtKeyword += "區";
        }

        let getRainfullRateErr = 0;
        const outputMsg = await weatherDataHandler.getRainfullRate(districtKeyword).catch(err => {
            console.log(err);
            getRainfullRateErr = 1;
            return;
        });
        if (getRainfullRateErr) return;
        return linReplyHandler.replyWithText(client, event, outputMsg);

    }


}

module.exports = EventHandler