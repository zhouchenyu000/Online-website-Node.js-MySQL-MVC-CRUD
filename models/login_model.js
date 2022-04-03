const crypto = require('crypto'); // encryption
const db = require('./connection_db');

module.exports = class member{ //Anything about Member system
  
  Login(Data) { // 登入
    let result = {};
    return new Promise((resolve, reject) => {
        console.log(Data)
        db.query('SELECT * FROM manager WHERE account = ? AND password = ?', [Data.account, Data.password], function (err, rows) {
          if (err) {
            result.status = "登入失敗。"
            result.err = "伺服器錯誤，請稍後在試！"
            reject(result);
            return;
          }
          else if (rows.length==0) {
            result.status = "登入失敗。"
            result.err = "帳號或密碼錯誤"
            reject(result);
            return;
          }
          console.log('h')
          return res.json({
              message: "成入成功"
          })
        });
    });
  }
}

