/**
 * Created by ken on 2016/10/09.
 */


// get the client
const mysql = require('mysql2/promise');
const config = require('./config');
let pool = null;

class Connection {
    constructor() {
        if (!pool) {
            this.newPool();
        }
        this.pool = pool;
    }

    newPool() {
        pool = mysql.createPool(config.db_connection);
    }

    execute(sql, params) {
        return this.pool.query(sql, params);
    }
}

module.exports = Connection;
