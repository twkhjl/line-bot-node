const db = require("../database/DB");
const tableName = "img";

const ImgModel = {
    insert: data => {
        const sql = `insert into ${tableName} set ?`;
        const args = data;

        return new Promise((resolve, reject) => {
            db.query(sql, args, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });

    },

    getRandomImg: async () => {

        const sql = `SELECT * FROM ${tableName}
        ORDER BY RAND()
        LIMIT 1;`;
        const args = [];

        return new Promise((resolve, reject) => {
            db.query(sql, args, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    },



    getRandomByGroupID: (group_id) => {

        const sql = `SELECT * FROM ${tableName}
        where group_id = ?
        ORDER BY RAND()
        LIMIT 1;`;
        const args = [group_id];

        return new Promise((resolve, reject) => {
            db.query(sql, args, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });

    },

    getOneByTitleAndGroupID: (title, group_id) => {

        const sql = `select * from ${tableName} where title = ? AND group_id = ?`;
        const args = [title, group_id];

        return new Promise((resolve, reject) => {
            db.query(sql, args, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });

    },
    removeOneFromGroup: (data) => {

        if (!data || !data.group_id || !data.title) {
            return Promise.resolve(null);
        }

        const sql = `delete from ${tableName} where group_id = ? and title = ?`;
        const group_id = data.group_id;
        const title = data.title;
        const args = [group_id, title];

        return new Promise((resolve, reject) => {
            db.query(sql, args, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });

    },
    removeAllFromGroup: (data) => {

        if (!data || !data.group_id) {
            return Promise.resolve(null);
        }

        const sql = `delete from ${tableName} where group_id = ?`;
        const group_id = data.group_id;
        const args = [group_id];

        return new Promise((resolve, reject) => {
            db.query(sql, args, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });

    },

}

module.exports = ImgModel