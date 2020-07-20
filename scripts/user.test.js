const mongoose = require("mongoose");
const chalk = require("chalk");
const db = require("../models");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fetch", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// =================================================================================================
// ======== Uncomment a function, add data and run "npm run user-test" to test the function ========
// =================================================================================================

let ObjectId = "5f14e0d63e30bc694a63ed0c"; // <===== Add a userId from your database here
// ==== FIND USER ====
// db.User.findById(ObjectId)
//   .populate("pets")
//   .then((userData) => {
//     console.log(userData)
//     // res.json(userData);
//   })
//   .catch((err) => {
//     console.error(chalk.red("User could not be found"));
//     // res.status(422).json(err);
//   });

// ==== CREATE USER ====
// const user = {
//   username: "Nemmy",
//   email: "seed@g.com",
//   password: "123456",
//   pets: [],
//   matches: [],
//   messages: [],
// };
// db.User.create(user)
//   .then((userData) => {
//     // Create JWT Payload
//     console.log(userData)
//     const payload = { id: userData._id, username: userData.username };
//     // Sign token
//     jwt.sign(
//       payload,
//       keys.secretOrKey,
//       {
//         expiresIn: 31556926, // 1 year in seconds
//       },
//       (err, token) => {
//         userData.password = undefined;
//         userData.token = token;
//         console.log(userData)
//       }
//     );
//   })
//   .catch((err) => {
//     if (err.name == "ValidationError") {
//       console.log("Validation error")
//       console.log(chalk.red(err.message))
//     } else if (err.name == "MongoError") {
//       console.log("Duplication error")
//       console.log(chalk.red(err))
//     } else {
//       console.log(chalk.red("Other error"))
//     }
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
(async function () {
  try {
    const userData = await db.User.findByIdAndDelete(ObjectId);
    if (userData.pets.length > 0) {
      const removedPet = await db.Pet.findByIdAndDelete(userData.pets[0]);
      if (userData.matches.length > 0) {
        const removedSwipes = await db.Swipe.deleteMany({
          $or: [{ petId: userData.pets[0] }, { targetPetId: userData.pets[0] } ]
        });
        const removedMatches = await db.Match.deleteMany({
          $or: [{ pet1Id: userData.pets[0] }, { pet2Id: userData.pets[0] } ]
        });
      }
    }
    console.log(chalk.green(userData.username + " was deleted"));
  } catch (err) {
    console.log(chalk.red(err));
  }
}());
