const db = require('./connection_db');
var data
module.exports = function () {
    this.fullName = function () {
        db.query('SELECT * FROM product', function (err, rows) {
        if (err) {
            console.log('connecting error');
        }
            data = rows;
        })
        return (data);
    }
}
