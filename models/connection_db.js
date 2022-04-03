// DataBase
const mysql = require("mysql");

/*const connection = mysql.createConnection({
  host: 'us-cdbr-east-05.cleardb.net',
  user: 'b5e791f795f132',
  password: 'cef3bd35',
  database: 'heroku_f27d53437185ee5'
});*/

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  database: 'test'
});

module.exports = connection;