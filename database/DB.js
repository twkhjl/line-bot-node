require('dotenv').config();
const mysql = require('mysql');

class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }
   
}




const DB  = new Database({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
});

module.exports = DB.connection;