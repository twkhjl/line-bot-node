const pttBubble2 = function (options) {
    const bubbleSize = options.bubbleSize;
    return {
        "type": "bubble",
        "hero": {
            "type": "image",
            "size": "full",
            "aspectRatio": "20:13",
            "aspectMode": "cover",
            "url": "https://images.pexels.com/photos/2957862/pexels-photo-2957862.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        "size": bubbleSize,
        "body": {
            "type": "box",
            "layout": "vertical",
            "spacing": "md",
            "contents": [
                {
                    "type": "text",
                    "text": "ptt文章2",
                    "weight": "bold",
                    "align": "center",
                    "size": "xl"
                },
                {
                    "type": "button",
                    "style": "secondary",
                    "action": {
                        "type": "message",
                        "label": "NBA板熱門",
                        "text": "NBA板熱門"
                    }
                },
                {
                    "type": "button",
                    "style": "secondary",
                    "action": {
                        "type": "message",
                        "label": "棒球板熱門",
                        "text": "棒球板熱門"
                    }
                },
                {
                    "type": "button",
                    "style": "secondary",
                    "action": {
                        "type": "message",
                        "label": "西洽板熱門",
                        "text": "西洽板熱門"
                    }
                },

            ]
        }
    };
}

module.exports = pttBubble2;