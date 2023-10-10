const ReplyHandler = {

    replyWithText: (client, event, text) => {
        
        if(!client) return false;
        if(!event) return false;
        if(!text) return false;

        const echo = {
            type: 'text',
            text: text,
            quoteToken: event.message.quoteToken
        };
        return client.replyMessage(event.replyToken, echo);
    },

    replyWithImg: (client, event, originalContentUrl, previewImageUrl = null) => {
        
        if(!client) return false;
        if(!event) return false;
        if(!originalContentUrl) return false;

        const echo = {
            type: "image",
            originalContentUrl: originalContentUrl,
            previewImageUrl: previewImageUrl || originalContentUrl,
            animated: true
        }
        return client.replyMessage(event.replyToken, echo);
    }

}



module.exports = ReplyHandler;