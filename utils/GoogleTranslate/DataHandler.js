// https://github.com/vitalets/google-translate-api/tree/legacy
// https://github.com/vitalets/google-translate-api/blob/legacy/languages.js

const validator = require("./Validator");
const DataHandler = {
    langList: {
        "中": "zh-TW",
        "英": "en",
        "日": "ja",
        "韓": "ko",
    },
    translate: async function (text, lang = "中") {

        if (validator.isStringLengthTooLong(text)) {

            const err = {
                hasErr: true,
                errMsg: "text length too long"
            };
            return Promise.reject(err);

        }

        const langType = this.langList[lang] || "zh-TW";
        const translate = require('@vitalets/google-translate-api');
        const res = await translate(text, { to: langType });

        return res.text;
    }
}

module.exports = DataHandler;
