const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-shop',
    password: '1guymor1'
});

module.exports = pool.promise();