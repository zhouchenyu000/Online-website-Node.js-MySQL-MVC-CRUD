const sinon = require("sinon");
var controller_4 = require('../controllers/login_controller');
var LoginControllers = new controller_4()
var encryption = require('../controllers/encryption');
const axios = require("axios");
const mockRequest = (data) => {
    return {
        body: data
    }
}

const mockResponse = () => {
    const res = {};
    res.json = sinon.stub().returns(res);
    return res;
}
let axiosPostStub
describe("[登入功能]", () => {
    before(() => {
        axiosPostStub = sinon.stub(axios, "post");
    })

    after(() => {
        axiosPostStub.restore();
    })

    it("登入成功", async () => {
        const data = {
          account: "admin@example.com",
          password:'12345678'
        }
        const req = mockRequest(data)
        const res = mockResponse();
        axiosPostStub.withArgs("http://localhost:3000/Login", data).resolves({
            status: 0
        })
        await LoginControllers.Login(req, res)
        sinon.assert.calledWith(res.json, {
            message: "登入成功",
        });
        sinon.assert.calledOnce(res.json);
    })
    it("登入錯誤", async () => {
        const data = {
            username: "123",
            password:'12345678'
        }
        const req = mockRequest(data)
        const res = mockResponse();
        axiosPostStub.withArgs("http://localhost:3000/Login", data).resolves({
            status: -1
        })
        await LoginControllers.Login(req, res)
        sinon.assert.calledWith(res.json, {
            message: "登入失敗",
        });
        sinon.assert.calledOnce(res.json);
    })
})