const mongoose = require("mongoose");
const chalk = require("chalk");
const db = require("../models");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const bcrypt = require('bcryptjs');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fetch", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// =================================================================================================
// ======== Uncomment a function, add data and run "npm run user-test" to test the function ========
// =================================================================================================

let ObjectId = "5f14e0803e30bc694a63ed0a"; // <===== Add a userId from your database here
// ==== FIND USER ====
// (async function() {
//   try {
//     const userData = await db.User.findById(ObjectId).populate("pets");
//     console.log(userData)
//     // res.status(400).json({ msg: "Invalid user ID" });
//   } catch (err) {
//     if(err.name == "CastError") {
//       console.log("Invalid user ID");
//     } else {
//       console.log(chalk.red(err));
//     }
//   }
// }())

// ==== FIND MATCHES ====
// (async function () {
//   try {
//     const matchData = await db.User.findById(ObjectId)
//       // Populate pets in matches array then populate user for each pet
//       .populate({
//         path: "matches",
//         populate: { path: "userId", model: "User" },
//       });
//       console.log(matchData)
//     if (matchData.matches.length === 0) {
//       console.log("No matches found, start swiping to match!");
//     }
//     console.log(matchData.matches);
//   } catch (err) {
//     console.log(err)
//   }
// })();

// ==== LOGIN ====
// (async function() {
//   const inputPW = '12345';
//   try {
//     const user = await db.User.findOne({ email: "test1@g.com" })
//     .select("+password")
//     .populate("pets")
//     if(!user) {
//       return console.log("Invalid email")
//     }
//     bcrypt.compare(inputPW, user.password).then((isMatch) => {
//       if (isMatch) {
//         // User exists - Create JWT Payload
//         const payload = { id: user._id, username: user.username };
//         // Sign token
//         jwt.sign(
//           payload,
//           keys.secretOrKey,
//           {
//             expiresIn: 31556926, // 1 year in seconds
//           },
//           (err, token) => {
//             if (err) {
//               return console.log("Error creatin token")
//             }
//             user.password = undefined;
//             return console.log("Success!", user);
//           }
//         );
//       } else {
//         console.log("Invalid password");
//       }
//     });
//   } catch (err) {
//     console.log(err)
//   }
// }())


// ==== CREATE USER ====
const body = {
  username: "Test Dude",
  email: "test1@g.com",
  password: "123456",
  pets: [],
  matches: [],
  messages: [],
};
(async function() {
  try {
    const newUser = await db.User.create(body);
    // Create JWT Payload
    const payload = { id: newUser._id, username: newUser.username };
    // Sign token
    jwt.sign(
      payload,
      keys.secretOrKey,
      {
        expiresIn: 31556926, // 1 year in seconds
      },
      (err, token) => {
        if (err) {
          return console.log("No token created")
        }
        newUser.password = undefined;
        newUser.token = token;
        return console.log(newUser);
      }
    );
  } catch (err) {
    if (err.name == "ValidationError") {
      console.log(err.message)
    } else if (err.name == "MongoError") {
      console.log(err.message)
    } else {
      console.log(err.message)
    }
  }
}())


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
// (async function () {
//   try {
//     const userData = await db.User.findByIdAndDelete(ObjectId);
//     if (userData.pets.length > 0) {
//       const removedPet = await db.Pet.findByIdAndDelete(userData.pets[0]);
//       if (userData.matches.length > 0) {
//         const removedSwipes = await db.Swipe.deleteMany({
//           $or: [{ petId: userData.pets[0] }, { targetPetId: userData.pets[0] } ]
//         });
//         const removedMatches = await db.Match.deleteMany({
//           $or: [{ pet1Id: userData.pets[0] }, { pet2Id: userData.pets[0] } ]
//         });
//       }
//     }
//     console.log(chalk.green(userData.username + " was deleted"));
//   } catch (err) {
//     console.log(chalk.red(err));
//   }
// }());
