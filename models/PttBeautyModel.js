const db = require("../database/DB");
const mysql = require('mysql');

const tableName = "ptt_beauty_imgs";

const PttBeautyModel = {

    selectAll: () => {
        const sql = `
            SELECT url,blacklist,gender FROM ${tableName};
        `;
        const args = [];
        return new Promise((resolve, reject) => {
            db.query(sql, args, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                if (!rows) {
                    return resolve(rows);
                }
                const output = rows.map(e => e.url);
                resolve(output);
            });
        });
    },
    checkUrlExist: data => {
        const sql = `
            SELECT url FROM ${tableName} WHERE url in ('${data}');
        `;
        const args = [];
        return new Promise((resolve, reject) => {
            db.query(sql, args, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                if (!rows) {
                    return resolve(rows);
                }
                const output = rows.map(e => e.url);
                resolve(output);
            });
        });
    },
    insert: data => {
        const sql = `INSERT INTO ${tableName} (url, gender, blacklist,created_at)
        VALUES ?`;
        
        const args = data;

        return new Promise((resolve, reject) => {
            db.query(sql, [args], (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });

    },

    // 從資料庫隨機抽現成網址
    getRandomFemaleImg: async () => {

        const sql = `SELECT url FROM ptt_beauty_imgs
        WHERE gender='female' AND blacklist <> 1
        ORDER BY RAND()
        LIMIT 1;`;
        const args = [];

        return new Promise((resolve, reject) => {
            db.query(sql, args, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                if(rows[0]){
                    return resolve(rows[0].url);
                }
                return resolve(rows);
            });
        });
    },

     // 從資料庫隨機抽現成網址
     getRandomMaleImg: async () => {

        const sql = `SELECT url FROM ptt_beauty_imgs
        WHERE gender='male' AND blacklist <> 1
        ORDER BY RAND()
        LIMIT 1;`;
        const args = [];

        return new Promise((resolve, reject) => {
            db.query(sql, args, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                if(rows[0]){
                    return resolve(rows[0].url);
                }
                return resolve(rows);
            });
        });
    },



}

module.exports = PttBeautyModel