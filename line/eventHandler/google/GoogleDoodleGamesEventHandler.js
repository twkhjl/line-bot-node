const GoogleDoodleModel = require("../../../models/GoogleDoodleModel");
const commandObj = require("../../command");
const lineReplyHandler = require("../../ReplyHandler");

const GoogleDoodleGamesEventHandler = {
    showAll: async (client, event) => {

        let data = await GoogleDoodleModel.all();

        // 將資料分成三筆一組
        const n = 3;
        const dataGroup = data.reduce((r, e, i) =>
            (i % n ? r[r.length - 1].push(e) : r.push([e])) && r
            , []);
        const bubbleArr = [];

        dataGroup.forEach(group => {
            let contents = [];
            group.forEach(item => {
                contents.push({

                    "type": "button",
                    "style": "secondary",
                    "action": {
                        "type": "uri",
                        "label": item.name,
                        "uri": item.url
                    }

                })
            });

            bubbleArr.push({
                "type": "bubble",
                "size": "kilo",
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "md",
                    "contents": contents
                }
            });

        });

        const flexMessage = {
            "type": "carousel",
            "contents": bubbleArr,
        };

        return lineReplyHandler.replyWithFlex(client, event, flexMessage);

    }
}
const xGoogleDoodleGamesEventHandler = async function (client, event) {

    // google小遊戲
    if (commandObj.google.doodle.regex.exec(event.message.text)) {


    }




}

module.exports = GoogleDoodleGamesEventHandler;