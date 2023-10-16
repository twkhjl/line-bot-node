
const lineReplyHandler = require("../ReplyHandler");
const commandObj = require("../command");

const numHelper = require("../../helpers/numHelper");

const gameData = require("../../games/guessNumber/Data");
const gameConfig = require("../../games/guessNumber/Config");
const dataHandler = require("../../games/guessNumber/DataHandler");
const validator = require("../../games/guessNumber/Validator");


const handleUserLose = (client, event, index) => {
    if (validator.isUserLose(gameData.groupData[index])) {

        const correctNumber = gameData.groupData[index].correctNumber;
        outputMsg = `沒猜中~正確數字為${correctNumber}~遊戲結束,下次再接再勵~`;
        gameData.groupData.splice(index, 1);
        lineReplyHandler.replyWithText(client, event, outputMsg);
        return true;

    }
    return false;
}

const GuessNumberEventHandler = function (client, event) {

    const eventMessageText = event.message && event.message.text ? event.message.text : "";
    const groupId = event.source && event.source.groupId ? event.source.groupId : "";

    if (commandObj.game.guessNumber.startGame.regex.exec(event.message.text)
        && !validator.isCurrentlyPlaying(groupId)
    ) {
        gameData.groupData.push({
            groupId: groupId,
            phase: gameConfig.phases.decideMaxNum,
        })
        const outputMsg = "好喔,請輸入最大數字:";
        return lineReplyHandler.replyWithText(client, event, outputMsg);


    }

    if (validator.isPhaseDecideMaxNum(groupId, eventMessageText)
        && numHelper.isPositiveInteger(eventMessageText)
        && !validator.isValidMaxNum(eventMessageText)) {

        const outputMsg = "數字太大惹,請不要超過500";
        return lineReplyHandler.replyWithText(client, event, outputMsg);
    }

    if (validator.isPhaseDecideMaxNum(groupId, eventMessageText)
        && validator.isValidMaxNum(eventMessageText)) {

        const minNumber = 1;
        const maxNumber = eventMessageText * 1;
        dataHandler.configureBeforeGameStart(groupId, minNumber, maxNumber);

        console.log(gameData.groupData);
        const outputMsg = `遊戲開始,數字為${minNumber}~${maxNumber}`;
        return lineReplyHandler.replyWithText(client, event, outputMsg);

    }

    if (validator.isPhaseGuessing(groupId, eventMessageText)
        && numHelper.isPositiveInteger(eventMessageText)
        && !validator.isInputNumberCorrect(groupId, eventMessageText)) {

        const inputNumber = eventMessageText * 1;

        const index = dataHandler.findIndexByGroupId(groupId);
        const correctNumber = gameData.groupData[index].correctNumber;


        let outputMsg = '';

        if (gameData.groupData[index].minNumber > inputNumber
            || inputNumber > gameData.groupData[index].maxNumber) {

            outputMsg = `請猜${gameData.groupData[index].minNumber}~${gameData.groupData[index].maxNumber}之間的數字 ^_^|||`;
            return lineReplyHandler.replyWithText(client, event, outputMsg);

        }

        if (gameData.groupData[index].minNumber < inputNumber
            && inputNumber < correctNumber
        ) {

            gameData.groupData[index].minNumber = inputNumber + 1;

            const isUserLose = handleUserLose(client, event, index);
            if (isUserLose) return;

            outputMsg = `差一點,數字為${gameData.groupData[index].minNumber}~${gameData.groupData[index].maxNumber}`;
            return lineReplyHandler.replyWithText(client, event, outputMsg);

        }
        if (correctNumber < inputNumber
            && inputNumber < gameData.groupData[index].maxNumber
        ) {

            gameData.groupData[index].maxNumber = inputNumber - 1;

            const isUserLose = handleUserLose(client, event, index);
            if (isUserLose) return;

            outputMsg = `差一點,數字為${gameData.groupData[index].minNumber}~${gameData.groupData[index].maxNumber}`;
            return lineReplyHandler.replyWithText(client, event, outputMsg);

        }
        
        if (gameData.groupData[index].minNumber == inputNumber) {
            gameData.groupData[index].minNumber = inputNumber + 1;
        }
        if (gameData.groupData[index].maxNumber == inputNumber) {
            gameData.groupData[index].maxNumber = inputNumber - 1;
        }
        const isUserLose = handleUserLose(client, event, index);
        if (isUserLose) return;

        outputMsg = `差一點,數字為${gameData.groupData[index].minNumber}~${gameData.groupData[index].maxNumber}`;
        return lineReplyHandler.replyWithText(client, event, outputMsg);


    }

    if (validator.isPhaseGuessing(groupId, eventMessageText)
        && validator.isInputNumberCorrect(groupId, eventMessageText)) {

        const index = dataHandler.findIndexByGroupId(groupId);
        gameData.groupData.splice(index, 1);

        const outputMsg = `猜中了!!!你好棒!!!!`;
        return lineReplyHandler.replyWithText(client, event, outputMsg);

    }
    if (commandObj.game.guessNumber.endGame.regex.exec(event.message.text)
        && validator.isCurrentlyPlaying(groupId)) {
        const index = dataHandler.findIndexByGroupId(groupId);
        gameData.groupData.splice(index, 1);

        const outputMsg = `好喔,終極密碼遊戲結束`;
        return lineReplyHandler.replyWithText(client, event, outputMsg);


    }
    if (commandObj.game.guessNumber.endGame.regex.exec(event.message.text)
        && !validator.isCurrentlyPlaying(groupId)) {

        const outputMsg = `你冷靜,現在沒有進行中的終極密碼遊戲`;
        return lineReplyHandler.replyWithText(client, event, outputMsg);


    }
}


module.exports = GuessNumberEventHandler;