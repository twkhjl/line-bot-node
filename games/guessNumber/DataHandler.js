
const numHelper = require("../../helpers/numHelper");

const gameData = require("./Data");
const gameConfig = require("./Config");
const groupData = gameData.groupData;

const DataHandler = {
    findByGroupId: (groupId) => {
        return groupData.find(obj => obj["groupId"] === groupId);
    },
    findIndexByGroupId: (groupId) => {
        return groupData.findIndex(obj => obj["groupId"] === groupId);
    },
    configureBeforeGameStart: (groupId, minNumber, maxNumber) => {

        const index = DataHandler.findIndexByGroupId(groupId);
        const randomNumber = numHelper.generateRndomNumber(maxNumber);

        groupData[index].correctNumber = randomNumber;
        if (!randomNumber) groupData[index].correctNumber = 1;

        groupData[index].maxNumber = maxNumber * 1;
        groupData[index].minNumber = minNumber;
        groupData[index].phase = gameConfig.phases.guessing;
    },
}

module.exports = DataHandler;