const YoutubeSearchAPI = require("../../API/google/YoutubeSearchAPI");

const YoutubeDataHandler = {

    searchByKeyword: async function (keyword) {

        const searchResult = await YoutubeSearchAPI.searchByKeyword(keyword);
        const youtubeItems = searchResult.items;
        const filteredYoutubeItem = youtubeItems.filter(item=>!(item.id.videoId+"").includes("undefined"));
        const youtubeLinks = filteredYoutubeItem.map(item => {
            return "https://www.youtube.com/watch?v=" + item.id.videoId;
        })
        return youtubeLinks[0];

    }
}

module.exports = YoutubeDataHandler;
