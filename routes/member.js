var express = require('express');
var router = express.Router();

var modules = require('../models/member_model');
var MemberModules = new modules()
var modules1 = require('../controllers/member_controller');
var ProductControllers = new modules1()

router.get('/member_list', async function (req, res, next) {
    data_list = await MemberModules.getMemberData()
    console.log(data_list)
    res.render('member_list' , { data_list: data_list});
});

router.get('/member_add', function (req, res, next) {
    res.render('member_add' );
});

router.get('/member_edit', function (req, res, next) {
    res.render('member_edit' );
});

module.exports = router;
