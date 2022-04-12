var modules = require('../models/member_model');
var MemberModules = new modules()

module.exports = class GetPMember {
    AddMember = (req, res, next) =>{
      var MemberData = {
        id: null,
        name: req.body.name,
        account:req.body.account,
        password: req.body.password,
        sex: req.body.sex,
        phone: req.body.phone,
        ads: req.body.ads,
        email:req.body.email,
        create_date: onTime()
      }
      MemberModules.AddMemberData(MemberData).then(result => { 
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/member_list');
      }, (err) => {
        res.json({
            result: err
        })
      }).then((res) => {
            return res
        })
    }
    
    DelMember = (req, res, next) =>{
      //密碼加密
      console.log(req.body)
      var MemberData = {
        id: req.body.id,
      }
      console.log(MemberData)
      MemberModules.DelMemberData(MemberData).then(result => { 
        console.log(result)
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/member_list');
      }, (err) => {
        res.json({
            result: err
        })
      })
      }
    EditMember = (req, res, next) =>{
      var id = req.body.id
      
      var MemberData = {
        name: req.body.name,
        account:req.body.account,
        password: req.body.password,
        sex: req.body.sex,
        email: req.body.email,
        phone: req.body.phone,
        ads: req.body.ads,
      }
      MemberModules.EditMemberData(MemberData,id).then(result => { 
        /*res.json({
            result: result
        })*/
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/member_list');
      }, (err) => {
        res.json({
            result: err
        })
      })
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