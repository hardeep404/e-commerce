const { default: mongoose } = require("mongoose");
const orderModel = require("../Model/orderModel");
const userModel = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const apiErr = require("../otherwork/apiErr");


async function orderFun(req, res,next) {
  let data = req.body;

  let order = await orderModel.create(data);

  const token = req.headers["authorization"].split(" ")[1];

  if (!token) return next(new apiErr("Access denied", 403));

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decoded.userId;
  const orderId = {
    'OrderDetails': order.OrderId,
  };

  upDataOrder = await userModel.findByIdAndUpdate(userId, { $addToSet: orderId }, {
    new: true,
  });

  res.status(200).json({ success: true, Data: order });
}

module.exports = orderFun;
