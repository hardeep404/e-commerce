const express = require("express");
const orderFun = require("../ControllerFun/OrderFun");
const verifyToken = require("../middleware/VerifyTokenMid");
const MyOrder= require("../ControllerFun/MyOrder")

const Router = express.Router();

Router.post("/", verifyToken, orderFun);
Router.post("/myorder",MyOrder)

module.exports = Router;
