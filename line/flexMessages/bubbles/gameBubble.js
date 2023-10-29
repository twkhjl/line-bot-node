const gameBubble = function (options) {
    const bubbleSize = options.bubbleSize;
    return {
        "type": "bubble",
        "hero": {
            "type": "image",
            "size": "full",
            "aspectRatio": "20:13",
            "aspectMode": "cover",
            "url": "https://images.pexels.com/photos/3800795/pexels-photo-3800795.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        "size": bubbleSize,
        "body": {
            "type": "box",
            "layout": "vertical",
            "spacing": "md",
            "contents": [
                {
                    "type": "text",
                    "text": "小遊戲",
                    "weight": "bold",
                    "align": "center",
                    "size": "xl"
                },
                {
                    "type": "button",
                    "style": "secondary",
                    "action": {
                        "type": "message",
                        "label": "google小遊戲",
                        "text": "google小遊戲"
                    }
                },
                {
                    "type": "button",
                    "style": "secondary",
                    "action": {
                        "type": "message",
                        "label": "終極密碼",
                        "text": "mic終極密碼開始"
                    }
                },
                
                

            ]
        }
    }
}

module.exports = gameBubble;