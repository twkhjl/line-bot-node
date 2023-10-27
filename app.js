require('dotenv').config();

const line = require('@line/bot-sdk');
const express = require('express');

const LineRouter = require("./routers/line/LineRouter");

// create Express app
// about Express itself: https://expressjs.com/
const app = express();
app.set('view engine', 'ejs');

app.use('/callback', LineRouter);

// 本地端,勿push=============

const beautyRouter = require("./routers/ptt/BeautyRouter");
app.use(express.json());
app.use('/ptt/beauty', beautyRouter);

// const testRouter = require("./routers/TestRouter");
// app.use("/test/",testRouter);

app.get('/test',async (req,res)=>{
    const fetch = require('node-fetch');
    const YoutubeSearchAPI=require("./API/google/YoutubeSearchAPI");

    const searchResult = await YoutubeSearchAPI.searchByKeyword("starcraft");
    const youtubeItems = searchResult.items;
    const youtubeLinks = youtubeItems.map(item=>{
        return "https://www.youtube.com/watch?v="+item.id.videoId;
    })
    return console.log(youtubeLinks);



})
// 本地端,勿push=============

app.get('/', (req, res) => {
    res.render('home');
})

function getCommandData(obj, output = []) {
    if (typeof obj !== 'object') return output;
    for (let [k, v] of Object.entries(obj)) {
        if (v['name']) output.push({
            name: v['name'],
            description: v['description'],
        });
        if (!v['name'] && typeof v == 'object') {
            getCommandData(v, output);
        }
    }
    return output;
}

// 使用教學
app.get('/readme', (req, res) => {
    const commandObj = require("./line/command");
    const commandData = getCommandData(commandObj);

    res.render('line/readme', { data: commandData });
})


// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});