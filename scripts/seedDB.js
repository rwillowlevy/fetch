const mongoose = require("mongoose");
const chalk = require("chalk");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fetch", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const userSeed = {
  username: "test4",
  email: "test4@gmail.com",
  password: "12345",
  pets: [],
  matches: [],
  pendingMatches: [],
  messages: [],
};

db.User.create(userSeed)
  .then((userData) => {
    console.log(userData);
    // res.status(200).json(userData);
  })
  .catch((err) => {
    if (err.name == "ValidationError") {
      console.error(chalk.red(err));
      // res.status(422).json(err);
    } else {
      console.error(chalk.red(err));
      // res.status(500).json(err);
    }
  });
