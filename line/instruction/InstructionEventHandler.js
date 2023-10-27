const commandObj = require("../command");
const lineReplyHandler = require("../ReplyHandler");

const InstructionEventHandler = function (client, event, options = null) {

    const webHookUrl = options.webHookUrl || null;
    // 顯示教學
    if (commandObj.instruction.readme.regex.exec(event.message.text)) {

        let outputMsg = "";
        if (webHookUrl) {
            outputMsg = `請參考指令教學網址:\n${webHookUrl}/readme`;
        }

        if(!outputMsg) return null;

        return lineReplyHandler.replyWithText(client, event, outputMsg);
    }

    // 顯示指令輪播圖
    if (commandObj.instruction.carousel.regex.exec(event.message.text)) {

        const flexMessage = {
            "type": "carousel",
            "contents": [
                {
                    "type": "bubble",
                    "hero": {
                        "type": "image",
                        "size": "full",
                        "aspectRatio": "20:13",
                        "aspectMode": "cover",
                        "url": "https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=600"
                    },
                    "size": "deca",
                    "body": {
                        "type": "box",

                        "layout": "vertical",
                        "spacing": "md",
                        "contents": [
                            {
                                "type": "button",
                                "style": "secondary",
                                "action": {
                                    "type": "uri",
                                    "label": "使用教學",
                                    "uri": webHookUrl + "/readme"
                                }
                            },
                            {
                                "type": "button",
                                "style": "secondary",
                                "action": {
                                    "type": "message",
                                    "label": "與我聯絡",
                                    "text": "感謝使用mic機器人,有任何問題或回應都歡迎寄信與我聯絡:\ntwkhjl@gmail.com"
                                }
                            },


                        ]
                    }
                },

                {
                    "type": "bubble",
                    "hero": {
                        "type": "image",
                        "size": "full",
                        "aspectRatio": "20:13",
                        "aspectMode": "cover",
                        "url": "https://images.pexels.com/photos/840810/pexels-photo-840810.jpeg?auto=compress&cs=tinysrgb&w=600"
                    },
                    "size": "deca",
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "spacing": "md",
                        "contents": [

                            {
                                "type": "button",
                                "style": "secondary",
                                "action": {
                                    "type": "message",
                                    "label": "抽正妹圖",
                                    "text": "mic正妹呢"
                                }
                            },
                            {
                                "type": "button",
                                "style": "secondary",
                                "action": {
                                    "type": "message",
                                    "label": "抽帥哥圖",
                                    "text": "mic帥哥呢"
                                }
                            },

                        ]
                    }
                },
                {
                    "type": "bubble",
                    "hero": {
                        "type": "image",
                        "size": "full",
                        "aspectRatio": "20:13",
                        "aspectMode": "cover",
                        "url": "https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=600"
                    },
                    "size": "deca",
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "spacing": "md",
                        "contents": [

                            {
                                "type": "button",
                                "style": "secondary",
                                "action": {
                                    "type": "message",
                                    "label": "抽貓圖",
                                    "text": "mic貓呢"
                                }
                            },
                            {
                                "type": "button",
                                "style": "secondary",
                                "action": {
                                    "type": "message",
                                    "label": "抽狗圖",
                                    "text": "mic狗呢"
                                }
                            },
                            {
                                "type": "button",
                                "style": "secondary",
                                "action": {
                                    "type": "message",
                                    "label": "抽柴柴圖",
                                    "text": "mic柴柴呢"
                                }
                            },
                            {
                                "type": "button",
                                "style": "secondary",
                                "action": {
                                    "type": "message",
                                    "label": "抽植物圖",
                                    "text": "mic植物呢"
                                }
                            },

                        ]
                    }
                },

                {
                    "type": "bubble",
                    "hero": {
                        "type": "image",
                        "size": "full",
                        "aspectRatio": "20:13",
                        "aspectMode": "cover",
                        "url": "https://images.pexels.com/photos/3800795/pexels-photo-3800795.jpeg?auto=compress&cs=tinysrgb&w=600"
                    },
                    "size": "deca",
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "spacing": "md",
                        "contents": [

                            {
                                "type": "button",
                                "style": "secondary",
                                "action": {
                                    "type": "message",
                                    "label": "玩終極密碼",
                                    "text": "mic終極密碼開始"
                                }
                            },
                            {
                                "type": "button",
                                "style": "secondary",
                                "action": {
                                    "type": "message",
                                    "label": "結束終極密碼",
                                    "text": "mic終極密碼結束"
                                }
                            },


                        ]
                    }
                },

                {
                    "type": "bubble",
                    "hero": {
                        "type": "image",
                        "size": "full",
                        "aspectRatio": "20:13",
                        "aspectMode": "cover",
                        "url": "https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&w=600"
                    },
                    "size": "deca",
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "spacing": "md",
                        "contents": [

                            {
                                "type": "button",
                                "style": "secondary",
                                "action": {
                                    "type": "message",
                                    "label": "搜尋yt指令範例",
                                    "text": "yt 橄欖樹"
                                }
                            },

                            {
                                "type": "button",
                                "style": "secondary",
                                "action": {
                                    "type": "message",
                                    "label": "跟mic機器人聊天範例",
                                    "text": "@mic你好"
                                }
                            },

                        ]
                    }
                },


            ]
        };
        return lineReplyHandler.replyWithFlex(client, event, flexMessage);
    }
}


module.exports = InstructionEventHandler;