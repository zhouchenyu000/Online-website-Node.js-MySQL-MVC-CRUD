const Check = require('../models/check_data');
const check = new Check();

var modules = require('../models/login_model');
var LoginModules = new modules()

var encryption = require('../controllers/encryption');

module.exports = class Login {
    Login(req, res, next) {
        // 進行加密
        //const password = encryption(req.body.password);

        // 獲取client端資料
        const Data = {
            account: req.body.account,
            password: password,
        }
        if (check.checkNull(Data)) {
            return res.json({
                message: "登入失敗"
            })
        }
        else {
            LoginModules.Login(Data).then(result => {
                // 登入成功
                return res.json({
                    message: "成入成功"
                })
            },
                (err) => {
                    return res.json({
                        message: "登入失敗"
                    })
                }
            )
        }
    }
}