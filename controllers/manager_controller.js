var modules = require('../models/manager_model');
var ManagerModules = new modules()

var encryption = require('../controllers/encryption');

module.exports = class GetManager {

  AddManager = (req, res, next) => {
    var password = encryption(req.body.password);
    console.log(req.body)
    var ManagerData = {
      id: null,
      name: req.body.name,
      account:req.body.account,
      password: password,
      permission: req.body.permission,
    }
    console.log(ManagerData)
    ManagerModules.AddManagerData(ManagerData).then(result => {
      console.log(result)
      res.setHeader('Content-Type', 'application/json');
      res.redirect('/Manager_list');
    }, (err) => {
      res.json({
        result: err
      })
    })
  }
    
  DelManager = (req, res, next) => {
    var ManagerData = {
        id: req.body.id,
    }
    console.log(ManagerData)
    if (req.body.id == '1') {
      return res.json({
        result: '不得刪除最高權限'
      })
    }
    else {
      console.log(ManagerData)
      ManagerModules.DelManagerData(ManagerData).then(result => {
        console.log(result)
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/Manager_list');
      }, (err) => {
        res.json({
          result: err
        })
      })
    }
  }
  EditManager = (req, res, next) => {
    console.log(req.body.permission)
    if (req.body.id == '1') {
      res.json({
        result: '不得編輯最高權限'
      })
    }
    else {
      var password = encryption(req.body.password);
      var ManagerData = {
        id: req.body.id,
        name: req.body.name,
        password: password,
        account: req.body.account,
        permission: req.body.permission,
      }
      ManagerModules.EditManagerData(ManagerData).then(result => {
        /*res.json({
            result: result
        })*/
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/manager_list');
      }, (err) => {
        res.json({
          result: err
        })
      })
    }
  }
}
  



const onTime = () => {
    const date = new Date();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const hh = date.getHours();
    const mi = date.getMinutes();
    const ss = date.getSeconds();

    return [date.getFullYear(), "-" +
        (mm > 9 ? '' : '0') + mm, "-" +
        (dd > 9 ? '' : '0') + dd, " " +
        (hh > 9 ? '' : '0') + hh, ":" +
        (mi > 9 ? '' : '0') + mi, ":" +
        (ss > 9 ? '' : '0') + ss
    ].join('');
}