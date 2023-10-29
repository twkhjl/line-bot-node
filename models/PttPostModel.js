const db = require("../database/DB");
const mysql = require('mysql');

const tableName = "ptt_posts";

const PttPostModel = {

     // 清空整個資料表
     truncate: () => {
        
        const sql = `
            truncate ${tableName};
        `;
        const args = [];
        return new Promise((resolve, reject) => {
            db.query(sql, args, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                return resolve(rows);
            });
        });
    },

    // 取得爆文
    select100PushCntWithLimit: (data) => {
        const boardName = data.boardName;
        const limit = data.limit;
        const sql = `
            SELECT * FROM ${tableName}
            WHERE board_name = ?
            AND push_cnt = '爆' 
            ORDER BY post_date DESC
            LIMIT ${limit};
        `;
        const args = [boardName];
        return new Promise((resolve, reject) => {
            db.query(sql, args, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                return resolve(rows);
            });
        });
    },

    // 取得熱門文章
    selectByPushCntWithLimit: (data) => {
        const boardName = data.boardName;
        const limit = data.limit;
        const pushCnt = data.pushCnt;
        const sql = `
            SELECT * FROM ${tableName}
            WHERE board_name = ?
            AND (push_cnt >= ?
            OR push_cnt = '爆') 
            ORDER BY post_date DESC
            LIMIT ${limit};
        `;
        const args = [boardName, pushCnt];
        return new Promise((resolve, reject) => {
            db.query(sql, args, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                return resolve(rows);
            });
        });
    },

    // 取得噓文
    selectByBooCntWithLimit: (data) => {
        const boardName = data.boardName;
        const limit = data.limit;
        const pushCnt = data.pushCnt;
        const sql = `
            SELECT * FROM ${tableName}
            WHERE board_name = ?
            AND ( push_cnt  IN ( ? )
            OR push_cnt = 'XX' )
            ORDER BY post_date DESC
            LIMIT ${limit};
        `;
        const args = [boardName, pushCnt];
        return new Promise((resolve, reject) => {
            db.query(sql, args, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                return resolve(rows);
            });
        });
    },

    // 取得有X的噓文
    selectBooCntWithXWithLimit: (data) => {
        const boardName = data.boardName;
        const limit = data.limit;
        const sql = `
            SELECT * FROM ${tableName}
            WHERE board_name = ?
            AND 
            (push_cnt = 'X1'
            OR push_cnt = 'X2'
            OR push_cnt = 'X3'
            OR push_cnt = 'X4'
            OR push_cnt = 'X5'
            OR push_cnt = 'X6'
            OR push_cnt = 'X7'
            OR push_cnt = 'X8'
            OR push_cnt = 'X9'
            OR push_cnt = 'XX')
            ORDER BY post_date DESC
            LIMIT ${limit};
        `;
        const args = [boardName];
        return new Promise((resolve, reject) => {
            db.query(sql, args, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                return resolve(rows);
            });
        });
    },

    // 取得XX噓文
    select100BooCntWithLimit: (data) => {
        const boardName = data.boardName;
        const limit = data.limit;
        const pushCnt = data.pushCnt;
        const sql = `
            SELECT * FROM ${tableName}
            WHERE board_name = ?
            AND push_cnt = 'XX' 
            ORDER BY post_date DESC
            LIMIT ${limit};
        `;
        const args = [boardName, pushCnt];
        return new Promise((resolve, reject) => {
            db.query(sql, args, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                return resolve(rows);
            });
        });
    },

    insert: data => {
        const colArr = [
            "board_name",
            "title",
            "author",
            "url",
            "push_cnt",
            "page_num",
            "post_date",
            "created_at",
        ];

        const colConcatStr = colArr.join(",");
        const sql = `INSERT INTO ${tableName} (${colConcatStr})
        VALUES ? 
        ON DUPLICATE KEY UPDATE updated_at= SYSDATE()`;

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



}

module.exports = PttPostModel