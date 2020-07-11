const db = require("../models");
const chalk = require("chalk");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// usersController methods
module.exports = {
  findById: function ({ params }, res) {
    db.User.findById(params.id)
      .select("-password")
      .populate("pets")
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
    const { email, password } = req.body;
    // Find user by email
    db.User.findOne({
      email: email,
    }).then((user) => {
      // Check if user exists
      if (!user) {
        return res.status(400).json({
          message: "Invalid email or password",
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
            message: "Invalid email or password",
          });
        }
      });
    });
  },
  create: function ({ body }, res) {
    db.User.create(body)
      .then((userData) => {
        console.log(userData);
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
  update: function ({ params, body }, res) {
    db.User.findByIdAndUpdate(params.id, body, { new: true })
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
  updatePassword: function ({ params, body }, res) {
    db.User.findById(params.id)
      .then((userData) => {
        userData.password = body.password;
        userData.save()
          .then((userData) => {
            res.status(200).json({message: "Password Reset"});
          })
          .catch((err) => {
            console.error(err);
            res.status(422).json(err);
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(422).json(err);
      });
  },
  remove: function ({params}, res) {
    db.User.findByIdAndDelete(params.id)
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
