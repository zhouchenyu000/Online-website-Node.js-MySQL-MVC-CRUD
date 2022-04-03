var express = require('express');
var router = express.Router();

var modules = require('../models/manager_model');
var managerModules = new modules()


router.get('/manager_list', async function (req, res, next) {
    data_list = await managerModules.getManagerData()
    console.log(data_list)
    res.render('manager_list' , { data_list: data_list});
});

router.get('/manager_add', function (req, res, next) {
    res.render('manager_add' );
});

router.get('/manager_edit', function (req, res, next) {
    res.render('manager_edit' );
});

module.exports = router;
