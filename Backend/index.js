const   path =require("path")
require("dotenv").config();
const express = require("express");
const dbConnect = require("./dbConnect/DbConnect");

const OrderRouter = require("./Routers/OrderRouter");
const userRouter = require("./Routers/userRouter");
const Cors = require("cors");
const bodyParser = require("body-parser");

const server = express();
const _dirname = path.resolve();

server.use(express.json());
server.use(Cors());
server.use(bodyParser.json());
server.use("/order", OrderRouter);
server.use("/signin", userRouter);

server.use(express.static(path.join(_dirname, "/Frontend/dist")));
server.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"));
});

dbConnect()
  .then(() => {
    server.listen(8000, () => {
      console.log("server is listening on port 8000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
