const crypto = require('crypto'); // encryption
const db = require('./connection_db');

module.exports = class member{ //Anything about Member system

  Reg(MemberData) { // 註冊帳號
    let result = {};
    return new Promise((resolve, reject) => {
      db.query('SELECT email FROM member WHERE email = ?', MemberData.email, function (err, rows) {
        // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
        if (err) {
          console.log(err);
          result.status = "註冊失敗。"
          result.err = "伺服器錯誤，請稍後在試！"
          reject(result);
          return;
        }
        // 如果有重複的email
        if (rows.length > 0) {
          result.status = "註冊失敗。";
          result.err = "已有重複的Email。";
          reject(result);
          return;
        } 
        else {
          // 將資料寫入資料庫
          db.query('INSERT INTO member SET ?', MemberData, function (err, rows) {
            // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
            if (err) {
              console.log(err);
              result.status = "註冊失敗。";
              result.err = "伺服器錯誤，請稍後在試！"
              reject(result);
              return;
            }
            // 若寫入資料庫成功，則回傳給clinet端下：
            result.status = "註冊成功。"
            result.registerMember = MemberData;
            resolve(result);
          })
        }
      })
    })
  }
  
  Login(MemberData) { // 登入
    let result = {};
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM member WHERE email = ? AND password = ?', [MemberData.email, MemberData.password], function (err, rows) {
          if (err) {
            result.status = "登入失敗。"
            result.err = "伺服器錯誤，請稍後在試！"
            result.data = rows;
            reject(result);
            return;
          }
          resolve(result);
        });
    });
  }
  encryption(password) {
    let hashPassword = crypto.createHash('sha1');
    hashPassword.update(password);
    const rePassword = hashPassword.digest('hex');
    return rePassword;
  }
}

