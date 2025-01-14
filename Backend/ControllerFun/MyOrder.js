const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const apiErr = require("../otherwork/apiErr");
const userModel = require("../Model/userModel");

async function MyOrder(req,res) {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) return next(new apiErr("Access denied", 403));

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decoded.userId;

 const user= await userModel.findById(userId);

 res.status(200).json({ success: true, Data: user.OrderDetails });
  


}

module.exports = MyOrder;
