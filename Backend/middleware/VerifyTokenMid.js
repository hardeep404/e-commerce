const apiErr = require("../otherwork/apiErr");
const jwt = require("jsonwebtoken");
const userModel = require("../Model/userModel");

const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) return next(new apiErr("Access denied", 403));

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  let userData = await userModel.findById(decoded.userId);
  
  if (!userData)
    return next(new apiErr("Invalid token", 403));
  next();
};

module.exports = verifyToken;
