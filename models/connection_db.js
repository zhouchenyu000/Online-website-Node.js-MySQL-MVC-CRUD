// DataBase
const mysql = require("mysql");

const createPool = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  database: 'test'
});

module.exports = connection;