/**
 * Created by ken on 2016/10/09.
 */


// get the client
const mysql = require('mysql2/promise');
const config = require('./config');
let connection = null;

class Connection {
    constructor(conn=null) {
        if (!conn && !connection) {
            this.newConnection();
        }
        this.conn = conn || connection;
        this.retry = 0;
    }

    newConnection() {
        connection = mysql.createConnection(config.db_connection);
        return connection;
    }

    execute(sql, params) {
        return this.conn.then((c) => {
            if (!c.connection.stream.connecting && !c.connection.stream.readable) {
                console.log("re-connecting to MySQL...");
                this.conn = this.newConnection();
                return this.execute(sql, params)
            } else {
                return c.execute(sql, params);
            }
        });
    }
}

module.exports = Connection;
