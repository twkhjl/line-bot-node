require('dotenv').config();
const fetch = require('node-fetch');

const numHelper = require("../../helpers/numHelper");

const FreePlantApi = {
    // https://perenual.com/api/species/details/200?key=sk-kYAJ653928557fd3e2688

    getRandomImg: async function () {
        const headers = {
            'Content-Type': 'application/json',
        }
        const apiKey = process.env.FREE_PLANT_API_KEY;

        const num = numHelper.randomIntegerFromInterval(1, 3000);
        const rawUrl = `https://perenual.com/api/species/details/${num}?key=`;

        const url = rawUrl + apiKey;

        const response = await fetch(url, {
            headers: headers,
        })

        const data = await response.json();

        const rawImgs = data.default_image;
        let filteredImgs = [];
       

        return new Promise((resolve, reject) => resolve( rawImgs ));
    }

}


module.exports = FreePlantApi;