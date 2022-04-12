var should = require("should")
var router = require("../routes/index");
const request = require("supertest")
const { expect } = require("chai")

const express = require('express')
const app = express()
 
var modules_1 = require('../controllers/prodouct_controller');
var ProductControllers = new modules_1()

var res = {
    viewName: ""
    , data : {}
    , render: function(view, viewData) {
        this.viewName = view;
        this.data = viewData;
    }
};

describe("Routing", function(){
    describe("Default Route", function(){
        it("should provide the a title and the index view name", function(){
        router.get('/welcome', function (req, res, next) {
            res.render('index' );
        });
        console.log(res)
        res.viewName.should.equal("welcome");
        });

    });
});

describe("Routing", function(){
    describe("Default Route", function(){
        it("should provide the a title and the index view name", function(){
        router.post('/ProductAdd', ProductControllers.AddProduct);
        res.viewName.should.equal("product_list");
        });

    });
});

/*describe('POST /ProductAdd', function () {
  it('should respond with 200 if user account created successfully', async () => {
    const response = await request(app)
      .post('/ProductAdd')
      .send({name: "test", price: 1,quantity:1})
      .set('Accept', 'application/json')
      expect(response.statusCode).to.be.equal(200)
  })
});*/