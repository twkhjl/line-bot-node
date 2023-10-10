require('dotenv').config();

const api_key = process.env.CWA_WEATHER_API_KEY;

const cwaApi = {

    getKhWeather: async () => {
        const url = process.env.API_URL_CWA_KH_WEATHER;

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': api_key,
        }

        const response = await fetch(url, {
            headers: headers,
        })
        const data = await response.json();

        return new Promise((resolve, reject) => resolve(data));

    }
}


module.exports = cwaApi;