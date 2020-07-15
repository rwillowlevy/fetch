const db = require("../models");
const chalk = require("chalk");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// usersController methods
module.exports = {
  findById: function ({ params }, res) {
    db.User.findById(params.id)
      .populate("pets")
      .then((userData) => {
        res.json(userData);
      })
      .catch((err) => {
        console.error(chalk.red(err));
        res.status(422).json(err);
      });
  },
  login: function ({ body }, res) {
    const { email, password } = body;
    // Find user by email
    db.User.findOne({ email: email })
      .select("+password")
      .populate("pets")
      .then((user) => {
        // Check if user exists
        if (!user) {
          return res.status(400).json({msg: "Invalid email or password"});
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
                user.password = undefined;
                res.json({
                  success: true,
                  token: token,
                  user: user,
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

        const payload = {
          id: userData._id,
          username: userData.username,
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            userData.password = undefined;
            userData.token = token;
            res.json(userData);
          }
        );
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
    db.User.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    })
      .then((userData) => {
        console.log("Updated User:", userData);
        res.json(userData);
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
        userData
          .save()
          .then((userData) => {
            res.json({ message: "Password Reset" });
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
  remove: function ({ params }, res) {
    db.User.findByIdAndDelete(params.id)
      .then((userData) => {
        console.log("Removed User:", userData);
        res.json(userData);
      })
      .catch((err) => {
        console.error(chalk.red(err));
        res.status(422).json(err);
      });
  },

  verify: function(req, res){

    if( typeof req.params.token !== 'undefined'){
      const token = req.params.token
      console.log(token)
      jwt.verify(token, keys.secretOrKey, (err, authData) => {
        if(err){
          res.send(err.message).status(403)
        }else{
          res.send(authData)
        }
      })
    }else{
      res.status(403).json("No Token Found!")
    }
  }
};
