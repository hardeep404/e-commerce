const {body}=require("express-validator");

const authMiddleWare=[
    body("fullName").isString("fullName must be string").notEmpty().withMessage("fullName must not be empty").isLength({min:3,max:12}).withMessage("fullName must be 3 to 12 character long"),

    body("email").isString("email must be string").notEmpty().withMessage("email must not be empty").isEmail().withMessage("email must be valid email"),

body("password").isString("password must be string").notEmpty().withMessage("password must not be empty").isStrongPassword().withMessage("password must be a strong password"),

];

module.exports=authMiddleWare;