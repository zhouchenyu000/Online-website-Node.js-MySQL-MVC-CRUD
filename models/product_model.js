const db = require('./connection_db');

module.exports = class Product {
    getProductData = async function () {
        let result = {};
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM product', function (err, rows) {
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

    AddProductData = async function (ProductData) {
        let result = {};
        return new Promise((resolve, reject) => {
            console.log(ProductData)
            db.query('SELECT name FROM product WHERE name = ?', ProductData.name, function (err, rows) {
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
                    db.query('INSERT INTO product SET ?', ProductData, function (err, rows) {
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
                        result.data = ProductData;
                        resolve(result);
                    })
                }
            })
        })
    }

    DelProductData = async function (ProductData) {
        let result = {};
        var id_list = [];
        return new Promise((resolve, reject) => {
            db.query('Delete FROM product WHERE id IN (?)', [ProductData.id], function (err, rows) {
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

    EditProductData = async function (ProductData) {
            let result = {};
            return new Promise((resolve, reject) => {
                console.log(ProductData)
                db.query('UPDATE product Set name = ?,price = ?,quantity = ? WHERE id=?', [ProductData.name,ProductData.price,ProductData.quantity,ProductData.id], function (err, rows) {
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
}
