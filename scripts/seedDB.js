const mongoose = require("mongoose");
const chalk = require("chalk");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fetch");

const userSeed = [
  {
    username: "testUser",
    email: "test@seed.com",
    password: "123456",
    pets: [],
    matches: [],
    pendingMatches: [],
    messages: [],
  },
];

db.User.create(userSeed)
.then((userData) => {
  console.log(userData);
  // res.json(userData);
})
.catch((err, errors) => {
  if (err.name == "ValidationError") {
    console.error("Error Validating!", err);
    console.error(chalk.red(err))
    // res.status(422).json(err);
  } else {
    console.error(chalk.red(err));
    // res.status(500).json(err);
  }
});
