const aboutBubble = function (options) {
    const bubbleSize = options.bubbleSize;
    const webHookUrl = options.webHookUrl;
    return {
        "type": "bubble",
        "hero": {
            "type": "image",
            "size": "full",
            "aspectRatio": "20:13",
            "aspectMode": "cover",
            "url": "https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        "size": bubbleSize,
        "body": {
            "type": "box",

            "layout": "vertical",
            "spacing": "md",
            "contents": [
                {
                    "type": "text",
                    "text": "關於",
                    "weight": "bold",
                    "align": "center",
                    "size": "xl",
                },
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
    }
}

module.exports = aboutBubble;