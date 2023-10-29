const bubbleTemplate = function (data,config) {
    const bubbleSize = config.bubbleSize;

    return {
        "type": "bubble",
        
        "size": bubbleSize,
        "body": {
            "type": "box",
            "layout": "vertical",
            "spacing": "md",
            "contents": [
                {
                    "type": "text",
                    "text": "一些教學範例",
                    "weight": "bold",
                    "align": "center",
                    "size": "xl"
                },

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

                {
                    "type": "button",
                    "style": "secondary",
                    "action": {
                        "type": "message",
                        "label": "顯示支援的ptt板名範例",
                        "text": "mic支援ptt那些板"
                    }
                },



            ]
        }
    };
}

module.exports = bubbleTemplate;