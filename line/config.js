require('dotenv').config();


const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
    api: {
        groupSummary: process.env.API_GROUP_SUMMARY,
        userProfile: process.env.API_USER_PROFILE,
        groupMembersIds: process.env.API_GROUP_MEMBERS_IDS,
    }
};


module.exports = config;