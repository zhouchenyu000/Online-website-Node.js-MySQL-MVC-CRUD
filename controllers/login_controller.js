const Check = require('../models/check_data');
const check = new Check();

var modules = require('../models/login_model');
var LoginModules = new modules()

var encryption = require('../controllers/encryption');

module.exports = class Login {
    Login(req, res, next) {
        // 進行加密
        const  password = encryption(req.body.password);

        // 獲取client端資料
        const Data = {
            account: req.body.account,
            password: password,
        }
        if (check.checkNull(Data)) {
            res.json({ message: '登入失敗，帳號或密碼不可為空白' });
        }
        else {
            LoginModules.Login(Data).then(result => {
                // 登入成功
                res.setHeader('Content-Type', 'application/json');
                res.redirect('/index');
            },
                (err) => {
                    // 若寫入失敗則回傳
                    res.json({
                        err: err
                    })
                }
            )
        }
    }
}