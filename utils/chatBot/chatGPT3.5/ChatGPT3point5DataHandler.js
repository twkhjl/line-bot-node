require('dotenv').config();
const fetch = require('node-fetch');

const messageSetting = "你現在是一個叫做Mic的聊天機器人,請使用繁體中文跟我對話;";


const ChatGPT3point5DataHandler = {
    chat: async (inputMessage) => {
        const application_id = process.env.BOTLIBRE_APPLICATION_ID;
        const bot_id = process.env.BOTLIBRE_BOT_ID;
        const message = messageSetting + inputMessage;

        const raw_url = "https://www.botlibre.com/rest/api/form-chat?application={application_id}&instance={bot_id}&message={message}";

        const url = raw_url
            .replace("{application_id}", application_id)
            .replace("{bot_id}", bot_id)
            .replace("{message}", message);

        const response = await fetch(url);

        const data = await response.text();
        
        const regex = new RegExp(/<message>\n*(.+)<\/message>/gm);
        const outputArr = regex.exec(data);

        if(!outputArr || !outputArr[0]) return null;

        const responseMsg = outputArr[0]
        .replace("<message>","")
        .replace("</message>","")
        return responseMsg;
    }
}


module.exports = ChatGPT3point5DataHandler;

