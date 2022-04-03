const db = require('./connection_db');

module.exports = class Manager {
    getManagerData = async function () {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM manager', function (err, rows) {
                // 若資料庫部分出現問題，則回傳「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    console.log(err);
                    result.status = "取得全部商品資料失敗。"
                    result.err = "伺服器錯誤，請稍後在試！"
                    reject(result);
                    return;
                }
                // 若資料庫部分沒問題，則回傳全部產品資料。
                resolve(rows);
            })
        }).then((data) => {
            return data
        })
    }

    AddManagerData = async function (ManagerData) {
        let result = {};
        return new Promise((resolve, reject) => {
            console.log(ManagerData)
            db.query('SELECT name FROM Manager WHERE name = ?', ManagerData.name, function (err, rows) {
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
                    result.status = "新增失敗。";
                    result.err = "已有重複的商品。";
                    reject(result);
                    return;
                }
                else {
                    // 將資料寫入資料庫
                    db.query('INSERT INTO Manager SET ?', ManagerData, function (err, rows) {
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
                        result.data = ManagerData;
                        resolve(result);
                    })
                }
            })
        })
    }

    DelManagerData = async function (ManagerData) {
        let result = {};
        return new Promise((resolve, reject) => {
            console.log(ManagerData)
            db.query('Delete FROM Manager WHERE id = ?', [ManagerData.id], function (err, rows) {
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    console.log(err);
                    result.status = "刪除失敗。"
                    result.err = "伺服器錯誤，請稍後在試！"
                    reject(result);
                    return;
                }
                else {
                    result.status = "刪除成功。"
                    resolve(result);
                }
            })
        })
    }
    EditManagerData = async function (ManagerData) {
        let result = {};
        return new Promise((resolve, reject) => {
            console.log('Manager Edit')
            console.log(ManagerData)
            db.query('UPDATE manager Set ?', ManagerData, function (err, rows) {
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    console.log(err);
                    result.status = "更新失敗。"
                    result.err = "伺服器錯誤，請稍後在試！"
                    reject(result);
                    return;
                }
                else {
                    result.status = "更新成功。"
                    resolve(result);
                }
            })
        })
    }
    CheckManagerPermission(ManagerData) {
        db.query('SELECT permission FROM manager WHERE id =?', [ManagerData.id], function (err, rows) {
            console.log(rows[0].permission)
            if (rows[0].permission == '最高權限') {
                console.log('a')
                return true;
            }
        })
        console.log('b')
        return false;
    }
}
