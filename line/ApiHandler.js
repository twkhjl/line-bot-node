require('dotenv').config();

const fetch = require('node-fetch');

const lineConfig = require("./config");
const channelAccessToken = lineConfig.channelAccessToken;
const channelSecret = lineConfig.channelSecret;
const api = lineConfig.api;


const ApiHandler = {

    /*
    curl -v -X GET https://api.line.me/v2/bot/group/{groupId}/summary \
    -H 'Authorization: Bearer {channel access token}'
    */
    groupSummary: async (groupId) => {
        const url = api.groupSummary.replace("{groupId}", groupId);

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${channelAccessToken}`,
        }

        const response = await fetch(url, {
            headers: headers,
        })
        const data = await response.json();

        return new Promise((resolve, reject) => resolve(data));



    },

    /*
    curl -v -X GET https://api.line.me/v2/bot/profile/{userId} \
    -H 'Authorization: Bearer {channel access token}'
     */
    userProfile: async (userId) => {
        const url = api.userProfile.replace("{userId}", userId);

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${channelAccessToken}`,
        }

        const response = await fetch(url, {
            headers: headers,
        })
        const data = await response.json();

        return new Promise((resolve, reject) => resolve(data));


    }
};




module.exports = ApiHandler;