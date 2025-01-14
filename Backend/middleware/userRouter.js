const express= require("express");
const {registerUser,loginUser}= require("../ControllerFun/userFun");
const authMiddleWare = require("../middleware/authMiddleWare");

const Router= express.Router();

Router.post("/",authMiddleWare,registerUser);

Router.post("/login",loginUser)

module.exports=Router