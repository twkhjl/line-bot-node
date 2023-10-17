require('dotenv').config();


const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const lineConfig = require("./line/config");
// create LINE SDK client
const client = new line.Client(lineConfig);

const LineEventHandler = require("./line/EventHandler");

// create Express app
// about Express itself: https://expressjs.com/
const app = express();
app.set('view engine', 'ejs');

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

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(lineConfig), (req, res) => {
    // console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
    Promise
        .all(req.body.events.map(event => LineEventHandler(req, client, event)))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});


// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});