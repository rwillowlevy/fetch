const db = require("../models");
const chalk = require("chalk");

// usersController methods
module.exports = {
  findById: function (req, res) {
    db.User.findById(req.params.id)
      .then((userData) => {
        console.log("Found User:", userData);
        res.status(200).json(userData);
      })
      .catch((err) => {
        console.error(chalk.red(err));
        res.status(422).json(err);
      });
  },
  login: function (req, res) {
    res.json(req.user);
  },
  create: function (req, res) {
    db.User.create(req.body)
      .then((userData) => {
        console.log("Created User:", userData);
        res.status(200).json(userData);
      })
      .catch((err) => {
        if (err.name == "ValidationError") {
          console.error(chalk.red(err));
          res.status(422).json(err);
        } else {
          console.error(chalk.red(err));
          res.status(500).json(err);
        }
      });
  },
  update: function (req, res) {
    db.User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then((userData) => {
        console.log("Updated User:", userData);
        res.status(200).json(userData);
      })
      .catch((err) => {
        if (err.name == "ValidationError") {
          console.error(chalk.red(err));
          res.status(422).json(err);
        } else {
          console.error(chalk.red(err));
          res.status(500).json(err);
        }
      });
  },
  remove: function (req, res) {
    db.User.findOneAndDelete({ _id: req.params.id })
      .then((userData) => {
        console.log("Removed User:", userData);
        res.status(200).json(userData);
      })
      .catch((err) => {
        console.error(chalk.red(err));
        res.status(422).json(err);
      });
  },
};
