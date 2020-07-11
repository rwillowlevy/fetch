const mongoose = require("mongoose");
const chalk = require("chalk");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fetch", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

let ObjectId = "5f08c9aea15827fdb73f0b34";
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
    db.User.findOneAndUpdate(
      params.id,
      { $push: { pets: petData._id } },
      { new: true }
    )
      .then((userData) => {
        userData.password = "REDACTED";
        res.json(userData);
      })
      .catch((err) => res.status(422).json(err));
  })
  .catch((err) => res.status(422).json(err));
