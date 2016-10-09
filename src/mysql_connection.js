/**
 * Created by ken on 2016/10/09.
 */


// get the client
const mysql = require('mysql2/promise');
const config = require('./config');
let pool = null;

class Connection {
    constructor(conn=null) {
        if (!pool) {
            this.newPool();
        }
    }

    newPool() {
        this.pool = mysql.createPool(config.db_connection);
        pool = this.pool;
    }

    execute(sql, params) {
        const conn = this.pool.getConnection();
        return conn.then((c) => {
            return c.execute(sql, params);
        });
    }
}

module.exports = Connection;
