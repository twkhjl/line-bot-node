const numHelper = require("../helpers/numHelper");

const GuessNumber = {

    groupData: [],
    findByGroupId: (groupId) => {
        return GuessNumber.groupData.find(obj => obj["groupId"] === groupId);
    },
    findIndexByGroupId: (groupId) => {
        return GuessNumber.groupData.findIndex(obj => obj["groupId"] === groupId);
    },
    isPhaseDecideMaxNum: (groupId) => {
        return GuessNumber.findByGroupId(groupId)
            && GuessNumber.findByGroupId(groupId).phase == "decideMaxNum";
    },
    isValidMaxNum: (maxNum) => {
        return numHelper.isPositiveInteger(maxNum)
            && maxNum * 1 <= 500;
    },
    isPhaseGuessing: (groupId) => {
        return GuessNumber.findByGroupId(groupId)
            && GuessNumber.findByGroupId(groupId).phase == "guessing";
    },
    isCurrentlyPlaying: (groupId) => {
        return GuessNumber.findByGroupId(groupId)
            && GuessNumber.findByGroupId(groupId).phase;
    },
    isInputNumberCorrect: (groupId, eventMessageText) => {
        return GuessNumber.isPhaseGuessing
            && numHelper.isPositiveInteger(eventMessageText)
            && GuessNumber.findByGroupId(groupId).correctNumber == eventMessageText;
    }

}


module.exports = GuessNumber;