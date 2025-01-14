const mongoose = require("mongoose");

async function dbConnect() {
  await mongoose
    .connect("mongodb://localhost:27017/wow-shop")
    .then(() => {
      console.log("server connected to database");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = dbConnect;
