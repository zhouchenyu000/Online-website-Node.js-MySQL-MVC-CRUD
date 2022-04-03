var modules = require('../models/product_model');
var ProductModules = new modules()

module.exports = class GetProduct {
    AddProduct =(req, res, next) =>{
      console.log(req.body)
      var ProductData = {
        id: null,
        name: req.body.name,
        price:req.body.price,
        quantity: req.body.quantity,
      }
      console.log(ProductData)
      ProductModules.AddProductData(ProductData).then(result => { 
        //res.status(200).json({
        //    result: result
        //})
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/product_list');
      }, (err) => {
        res.json({
            result: err
        })
      })
    }
    
    DelProduct = (req, res, next) =>{
      var ProductData = {
        id: req.body.id,
      }
      console.log(ProductData)
      ProductModules.DelProductData(ProductData).then(result => { 
        console.log(result)
        /*res.json({
            result: result
        })*/
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/product_list');
      }, (err) => {
        res.json({
            result: err
        })
      })
    }
    
    EditProduct = (req, res, next) =>{
        console.log(req.body)
        var ProductData = {
          id: req.body.id,
          name: req.body.name,
          price:req.body.price,
          quantity: req.body.quantity,
        }
        console.log(ProductData)
        ProductModules.EditProductData(ProductData).then(result => { 
          /*res.json({
              result: result
          })*/
          res.setHeader('Content-Type', 'application/json');
          res.redirect('/product_list');
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


    return [date.getFullYear(), "-" +
        (mm > 9 ? '' : '0') + mm, "-" +
        (dd > 9 ? '' : '0') + dd, " " +
        (hh > 9 ? '' : '0') + hh, ":" ,
    ].join('');
}