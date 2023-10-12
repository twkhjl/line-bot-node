const numHelper = require("../../helpers/numHelper");

const gameConfig = require("./Config");
const dataHandler = require("./DataHandler");
const allowedMaxNum = gameConfig.allowedMaxNum;

const Validator = {
    
    isPhaseDecideMaxNum: (groupId) => {
        return dataHandler.findByGroupId(groupId)
            && dataHandler.findByGroupId(groupId).phase == "decideMaxNum";
    },
    isValidMaxNum: (maxNum) => {
        return numHelper.isPositiveInteger(maxNum)
            && maxNum * 1 <= allowedMaxNum;
    },
    isPhaseGuessing: (groupId) => {
        return dataHandler.findByGroupId(groupId)
            && dataHandler.findByGroupId(groupId).phase == "guessing";
    },
    isCurrentlyPlaying: (groupId) => {
        return dataHandler.findByGroupId(groupId)
            && dataHandler.findByGroupId(groupId).phase;
    },
    isInputNumberCorrect: (groupId, eventMessageText) => {
        return Validator.isPhaseGuessing
            && numHelper.isPositiveInteger(eventMessageText)
            && dataHandler.findByGroupId(groupId).correctNumber == eventMessageText;
    },
    isUserLose:(data)=>{
        return data.minNumber == data.maxNumber && data.maxNumber == data.correctNumber;
    }

}


module.exports = Validator;