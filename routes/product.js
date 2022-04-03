var express = require('express');
var router = express.Router();

var modules = require('../models/product_model');
var ProductModules = new modules()

/*router.get('/test', getProduct.getAllProduct);*/

router.get('/product_list', async function (req, res, next) {
    var data_list = await ProductModules.getProductData()
    console.log(data_list)
    res.render('product_list' , { data_list: data_list});
});
router.get('/product_add', function (req, res, next) {
   
    res.render('product_add');
});

router.get('/product_edit', function (req, res, next) {
    res.render('product_edit' );
});

module.exports = router;
