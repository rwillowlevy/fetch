const mongoose = require("mongoose");
const chalk = require("chalk");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fetch", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// =================================================================================================
// ======== Uncomment a function, add data and run "npm run user-test" to test the function ========
// =================================================================================================

let ObjectId = "5f0cfe2ba81b0003dd073b93"; // <===== Add a userId from your database here
// ==== FIND USER ====
// db.User.findById(ObjectId)
//   .populate("pets")
//   .then((userData) => {
//     console.log(userData)
//     // res.json(userData);
//   })
//   .catch((err) => {
//     console.error(chalk.red(err));
//     // res.status(422).json(err);
//   });

//  ==== UPDATE USER ====
// let update = { // <===== Add data to test update function
//   username: "updated",
//   email: "update@g.com"
// }
// db.User.findByIdAndUpdate(ObjectId, update, {
//   new: true,
//   runValidators: true,
// })
//   .then((userData) => {
//     console.log("Updated User:", userData);
//     // res.json(userData);
//   })
//   .catch((err) => {
//     if (err.name == "ValidationError") {
//       console.error(chalk.red(err));
//       // res.status(422).json(err);
//     } else {
//       console.error(chalk.red(err));
//       // res.status(500).json(err);
//     }
//   });

// ==== UPDATE PASSWORD ====
// let update = ""; // <===== Add a password here to test password update
// db.User.findById(ObjectId)
//   .then((userData) => {
//     console.log("Old:", userData.password);
//     userData.password = update;
//     userData
//       .save()
//       .then((userData) => {
//         console.log(userData)
//         // res.status(200).send("Password Reset");
//       })
//       .catch((err) => {
//         console.error(err);
//         // res.status(422).json(err);
//       });
//   })
//   .catch((err) => {
//     console.error(err);
//     // res.status(422).json(err);
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
