require('dotenv').config();
const fetch = require('node-fetch');
const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");



const ChatGptDataHandler = {
    chat: async (inputMessage) => {
        const application_id = process.env.BOTLIBRE_APPLICATION_ID;
        const bot_id = process.env.BOTLIBRE_BOT_ID;
        const message = inputMessage;

        const raw_url = process.env.BOTLIBRE_API_CHAT_URL;

        const url = raw_url
            .replace("{application_id}", application_id)
            .replace("{bot_id}", bot_id)
            .replace("{message}", message);

        const response = await fetch(url);

        const data = await response.text();

        if (!data) return null;

        const parser = new XMLParser();
        let jObj = parser.parse(data);

        if (!jObj) return null;

        const responseMsg = jObj.response.message;
        return responseMsg;
    }
}


module.exports = ChatGptDataHandler;

