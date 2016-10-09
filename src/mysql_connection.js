/**
 * Created by ken on 2016/10/09.
 */


// get the client
const mysql = require('mysql2/promise');
const config = require('./config');
const connection = mysql.createConnection(config.db_connection);

class Connection {
    constructor(conn=null) {
        this.conn = conn || connection;
    }

    execute(sql, params) {
        return this.conn.then((c) => c.execute(sql, params));
    }
}

module.exports = Connection;
