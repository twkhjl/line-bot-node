require('dotenv').config();
const fetch = require('node-fetch');

const YoutubeSearchAPI = {

    /*
        {
        "kind": "youtube#searchListResponse",
        "etag": "CEjeQea615C8QGXBh1aWcm4vcYI",
        "nextPageToken": "CAUQAA",
        "regionCode": "TW",
        "pageInfo": {
            "totalResults": 1000000,
            "resultsPerPage": 5
            },
            "items": [
                    {
                        "kind": "youtube#searchResult",
                        "etag": "Sl0q2Fy87CSa7uTrP3jK7--mVb8",
                        "id": {
                            "kind": "youtube#video",
                            "videoId": "2w5HfegfXMw"
                        }
                    },
                    {
                        "kind": "youtube#searchResult",
                        "etag": "BQ65vNZRvTBIOsJNQIf7f0aoyoc",
                        "id": {
                            "kind": "youtube#video",
                            "videoId": "ndIWZZZfpgw"
                        }
                    },
                    {
                        "kind": "youtube#searchResult",
                        "etag": "GHWdX7a6FBXLVlmh97GPHCdAJuA",
                        "id": {
                            "kind": "youtube#video",
                            "videoId": "Bu0B4busV5c"
                        }
                    },
                    {
                        "kind": "youtube#searchResult",
                        "etag": "G-Xq-L3fN4Uwuk2JqtJx5O1IO6I",
                        "id": {
                            "kind": "youtube#video",
                            "videoId": "EYXYAQE0Byk"
                        }
                    },
                    {
                        "kind": "youtube#searchResult",
                        "etag": "Dw0lH-wFxG13C3f1r9kGNqIu9t4",
                        "id": {
                            "kind": "youtube#video",
                            "videoId": "zKPf6knh5yo"
                    }
                }
            ]
        }
     */
    searchByKeyword: async function (keyword) {
        const headers = {
            'Content-Type': 'application/json',
        }
        const rawUrl = process.env.GOOGLE_YOUTUBE_SEARCH_URL;
        const googleApiKey = process.env.GOOGLE_API_KEY;

        const url = rawUrl
        .replace("{key}",googleApiKey)
        .replace("{q}",keyword);

        const response = await fetch(url, {
            headers: headers,
        })

        const data = await response.json();

        return new Promise((resolve, reject) => resolve(data));
    }
}


module.exports = YoutubeSearchAPI;