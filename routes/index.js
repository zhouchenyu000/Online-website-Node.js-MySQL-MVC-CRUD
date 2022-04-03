var express = require('express');
var router = express.Router();

var controller_1 = require('../controllers/prodouct_controller');
var ProductControllers = new controller_1()
var controller_2 = require('../controllers/member_controller');
var MemeberControllers = new controller_2()
var controller_3 = require('../controllers/manager_controller');
var ManagerControllers = new controller_3()
var controller_4 = require('../controllers/login_controller');
var LoginControllers = new controller_4()

var modules_1 = require('../models/manager_model');
var ManagerModules = new modules_1()
var modules_2 = require('../models/member_model');
var MemberModules = new modules_2()
var modules_3 = require('../models/product_model');
var ProductModules = new modules_3()

router.post('/ProductAdd', ProductControllers.AddProduct);
router.post('/ProductDel', ProductControllers.DelProduct);
router.post('/ProductEdit', ProductControllers.EditProduct);

router.post('/MemberAdd', MemeberControllers.AddMember);
router.post('/MemberDel', MemeberControllers.DelMember);
router.post('/MemberEdit', MemeberControllers.EditMember);

router.post('/ManagerAdd', ManagerControllers.AddManager);
router.post('/ManagerDel', ManagerControllers.DelManager);
router.post('/ManagerEdit', ManagerControllers.EditManager);

router.post('/Login', LoginControllers.Login);

router.get('/index', async function (req, res, next) {
    var ProductCount = (await ProductModules.getProductData()).length
    var MemberCount = (await MemberModules.getMemberData()).length
    var ManagerCount = (await ManagerModules.getManagerData()).length
    res.render('index', { ProductCount: ProductCount,MemberCount:MemberCount,ManagerCount:ManagerCount});
});

router.get('', function (req, res, next) {
    res.render('login' );
});
module.exports = router;
