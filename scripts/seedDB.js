const mongoose = require("mongoose");
const chalk = require("chalk");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fetch");

const userSeed = [
  {
    username: "dogOwner123",
    email: "test@seed.com",
    password: "1234",
    pets: [],
    matches: [],
    pendingMatches: [],
    messages: [],
  },
];

db.User.remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then((data) => {
    console.log(chalk.green(data.result.n + " records inserted!"));
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
