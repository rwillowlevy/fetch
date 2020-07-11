const mongoose = require("mongoose");
const chalk = require("chalk");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fetch", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

let ObjectId = "5f09ee11d40c9d21073629ac";
// ==== CREATE PET ====
const pet = {
  name: "Tucker",
  size: "Medium",
  age: "Senior",
  gender: "Male",
  bio: "He's a maniac",
  isVaccinated: true
}
db.Pet.create(pet)
  .then((petData) => {
    db.User.findByIdAndUpdate(
      ObjectId,
      { $push: { pets: petData._id } },
      { new: true }
    ).select("-password")
    .populate('pets')
      .then((userData) => {
        console.log(userData);
        // res.json(userData);
      })
      .catch((err) => console.log("Error updating user"));
  })
  .catch((err) => console.log("Error creating pet"));
