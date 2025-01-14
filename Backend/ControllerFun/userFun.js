require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const userModel = require("../Model/userModel");
const apiErr = require("../otherwork/apiErr");

async function registerUser(req, res, next) {
  try {
    let result = validationResult(req);
    let work = result.errors.map((err) => err.msg);

    if (work.length !== 0) {
      return next(new apiErr(work[0], 401));
    }

    let data = req.body;
    let checkUser = await userModel.findOne({ email: data.email });

    if (checkUser) {
      return next(new apiErr("you are already registered please login", 409));
    }

    let hashPassword = await bcrypt.hash(data.password, 10);
    newUser = await userModel.create({ ...data, password: hashPassword });

    res.status(200).json({ Success: true, Data: newUser });
  } catch (error) {
    next(new apiErr(error.errorResponse.errmsg, 404));
  }
}

async function loginUser(req, res, next) {
  try {
    let data = req.body;

    let existingUser = await userModel.findOne({ email: data.email });

    if (!existingUser) {
      return next(new apiErr("No User found please register first", 404));
    }

    let compare = await bcrypt.compare(data.password, existingUser.password);

    if (compare === false) {
      return next(new apiErr("wrong password", 401));
    }

    let token = jwt.sign({ userId: existingUser._id }, process.env.SECRET_KEY, {
      expiresIn: "10d",
    });

    res.status(200).json({ success: true, Data: existingUser, token });
  } catch (error) {
    next(new apiErr(error, 404));
  }
}

module.exports = { registerUser, loginUser };
