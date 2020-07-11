const mongoose = require("mongoose");
const chalk = require("chalk");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fetch", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

let ObjectId = "5f078585f72c12b8d3900da5";
// ==== FIND PET ====
// db.User.findById(ObjectId)
//   .then((userData) => {
//     console.log("Found User:", userData);
//     // res.status(200).json(userData);
//   })
//   .catch((err) => {
//     console.error(err);
//     // res.status(422).json(err);
//   });
