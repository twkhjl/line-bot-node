require('dotenv').config();

const lineConfig = require("./config");
const channelAccessToken = lineConfig.channelAccessToken;
const channelSecret = lineConfig.channelSecret;
const api = lineConfig.api;


const ApiHandler = {

    /*
    curl -v -X GET https://api.line.me/v2/bot/group/{groupId}/summary \
    -H 'Authorization: Bearer {channel access token}'
    */
    groupSummary: (groupId) => {
        const url = api.groupSummary.replace("{groupId}", groupId);
        const accessToken = lineConfig.channelAccessToken;

        return new Promise((resolve, reject) => {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }

            fetch(url, {
                headers,
            })
                .then((res) => resolve(res.json()))
                .catch(function (err) {
                    return reject(err);
                })
        });

    },

    /**
     curl -v -X GET https://api.line.me/v2/bot/group/{groupId}/members/ids?start={continuationToken} \
    -H 'Authorization: Bearer {channel access token}'
     
     */
    groupMembersIds: (groupId) => {
        const url = api.groupMembersIds.replace("{groupId}", groupId);
        const accessToken = lineConfig.channelAccessToken;

        return new Promise((resolve, reject) => {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }

            fetch(url, {
                headers,
            })
                .then((res) => resolve(res.json()))
                .catch(function (err) {
                    return reject(err);
                })
        });

    },

    /*
    curl -v -X GET https://api.line.me/v2/bot/profile/{userId} \
    -H 'Authorization: Bearer {channel access token}'
     */
    userProfile: (userId) => {
        const url = api.userProfile.replace("{userId}", userId);
        const accessToken = lineConfig.channelAccessToken;

        return new Promise((resolve, reject) => {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }

            fetch(url, {
                headers,
            })
                .then((res) => resolve(res.json()))
                .catch(function (err) {
                    return reject();
                })
        });

    }
};




module.exports = ApiHandler;