const   path =require("path"); 
require("dotenv").config();
const express = require("express");
const dbConnect = require("./dbConnect/DbConnect");

const OrderRouter = require("./Routers/OrderRouter");
const userRouter = require("./Routers/UserRouter");
const Cors = require("cors");
const bodyParser = require("body-parser");

const server = express();
const PORT= process.env.PORT_KEY ||8080;

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
    server.listen(PORT, () => {
      console.log(`server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
