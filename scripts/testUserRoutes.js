const mongoose = require("mongoose");
const chalk = require("chalk");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fetch", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

let ObjectId = "5f0886b27f72fae209358516";
// ==== FIND USER ====
// db.User.findById(ObjectId)
//   .then((userData) => {
//     console.log("Found User:", userData);
//     // res.status(200).json(userData);
//   })
//   .catch((err) => {
//     console.error(err);
//     // res.status(422).json(err);
//   });

//  ==== UPDATE USER ====
// let update = {
//   username: "testman7",
//   email: "testman7@gmail.com",
//   password: "123456",
// };
// db.User.findOneAndUpdate({ _id: ObjectId }, update, { new: true })
//   .then((userData) => {
//     console.log("Updated User:", userData);
//     // res.status(200).json(userData);
//   })
//   .catch((err) => {
//     if (err.name == "ValidationError") {
//       console.error(chalk.red(err));
//       //   res.status(422).json(err);
//     } else {
//       console.error(chalk.red(err));
//       //   res.status(500).json(err);
//     }
//   });

// ==== REMOVE USER ====
// db.User.findOneAndDelete({ _id: ObjectId })
//   .then((userData) => {
//     console.log("Removed User:", userData.username);
//     // res.status(200).json(userData);
//   })
//   .catch((err) => {
//     console.error(chalk.red(err));
//     // res.status(422).json(err);
//   });
