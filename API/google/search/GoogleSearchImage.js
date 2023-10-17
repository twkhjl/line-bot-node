require('dotenv').config();
const fetch = require('node-fetch');

const googleSearchApiKey = process.env.GOOGLE_SEARCH_API_KEY;
const googleSearchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;
const googleSearchApiUrl = process.env.GOOGLE_SEARCH_API_URL;

const GoogleSearchImage = async function (keyword) {

    const headers = {
        'Content-Type': 'application/json',
    }
    const url = googleSearchApiUrl
    .replace("{apiKey}", googleSearchApiKey)
    .replace("{searchEngineId}", googleSearchEngineId)
    .replace("{keyword}", keyword);


    const response = await fetch(url, {
        headers: headers,
    })

    const data = await response.json();

    return new Promise((resolve, reject) => resolve(data));


};



module.exports = GoogleSearchImage;