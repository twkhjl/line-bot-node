const db = require("../database/DB");
const tableName = "user";
const dateTimeHelper = require("../helpers/dateTimeHelper");

const UserModel = {
    insert: data => {
        const sql = `insert into ${tableName} set ?`;
        const args = data;
        args.created_at = dateTimeHelper.getCurrentTimeString();

        return new Promise((resolve, reject) => {
            db.query(sql, args, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });

    },

    update: data => {

        let sql = `update ${tableName} set `;
        let args = [];
        let cnt = 0;

        for (let [key, value] of Object.entries(data.dataToUpdate)) {


            if (value) {
                sql += ` ${key} = ? `;
            }
            if (cnt < Object.entries(data.dataToUpdate).length) {
                sql += ",";
            }
            args.push(value);
            cnt++;
        }

        sql +=" updated_at = ? ";
        args.push(dateTimeHelper.getCurrentTimeString());


        sql += " WHERE user_id = ? ";
        args.push(data.userId);


        return new Promise((resolve, reject) => {
            db.query(sql, args, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });

    },

    getOneByUserID: (user_id) => {

        const sql = `select * from ${tableName} where user_id = ?`;
        const args = [user_id];

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

module.exports = UserModel