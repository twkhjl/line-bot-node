const pttBubble = function (options) {
    const bubbleSize = options.bubbleSize;
    return {
        "type": "bubble",
        "hero": {
            "type": "image",
            "size": "full",
            "aspectRatio": "20:13",
            "aspectMode": "cover",
            "url": "https://images.pexels.com/photos/2129796/pexels-photo-2129796.png?auto=compress&cs=tinysrgb&w=600"
        },
        "size": bubbleSize,
        "body": {
            "type": "box",
            "layout": "vertical",
            "spacing": "md",
            "contents": [
                {
                    "type": "text",
                    "text": "ptt",
                    "weight": "bold",
                    "align": "center",
                    "size": "xl"
                },
                {
                    "type": "button",
                    "style": "secondary",
                    "action": {
                        "type": "message",
                        "label": "看ptt板熱門範例",
                        "text": "省錢板熱門"
                    }
                },
                {
                    "type": "button",
                    "style": "secondary",
                    "action": {
                        "type": "message",
                        "label": "看ptt板噓文範例",
                        "text": "電影板噓文"
                    }
                },
                {
                    "type": "button",
                    "style": "secondary",
                    "action": {
                        "type": "message",
                        "label": "看ptt板最新範例",
                        "text": "高雄板最新"
                    }
                },

            ]
        }
    }
}

module.exports = pttBubble;