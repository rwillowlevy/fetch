const db = require("../models");
const chalk = require("chalk");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../config/keys');

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
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    db.User.findOne({
      email: email,
    }).then((user) => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      // Check password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user._id,
            username: user.username,
          };
          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926, // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        } else {
          return res.status(400).json({
            message: "Password incorrect",
          });
        }
      });
    });
  },

  create: function (req, res) {
    db.User.findOne({
      email: req.body.email,
    }).then((user) => {
      if (user) {
        return res.status(400).json({
          email: "Email already exists",
        });
      } else {
        const newUser = new db.User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        });
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    });
  },
  update: function (req, res) {
    db.User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      {
        new: true,
      }
    )
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
    db.User.findOneAndDelete({
      _id: req.params.id,
    })
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
