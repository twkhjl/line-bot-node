const db = require("../database/DB");
const tableName = "message_record";

const MessageRecordModel = {
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


}

module.exports = MessageRecordModel