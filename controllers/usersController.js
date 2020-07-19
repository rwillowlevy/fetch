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
        if (!userData) {
          return res.status(400).json({ msg: "Invalid user ID" })
        }
        return res.json(userData)
      })
      .catch((err) => res.status(422).json(err));
  },
  findMatches: function({ params }, res) {
    db.User.findById(params.id)
      .populate({ // Populate pets in matches array then populate user for each pet
        path: 'matches',			
        populate: { path: 'userId', model: 'User' }
      })
      .then((userData) => {
        if (!userData) {
          return res.status(400).json({ msg: "No matches found, start swiping to match!" })
        }
        return res.json(userData.matches)
      })
      .catch((err) => res.status(422).json(err));
  },
  login: function ({ body }, res) {
    // Find user by email
    db.User.findOne({ email: body.email })
      .select("+password")
      .populate("pets")
      .then((user) => {
        // Check if user exists
        if (!user) {
          return res.status(400).json({ msg: "Invalid email or password" });
        }
        // Check password
        bcrypt.compare(body.password, user.password).then((isMatch) => {
          if (isMatch) {
            // User exists - Create JWT Payload
            const payload = { id: user._id, username: user.username };
            // Sign token
            jwt.sign(payload, keys.secretOrKey, {
                expiresIn: 31556926, // 1 year in seconds
              },
              (err, token) => {
                if (err) {
                  return res.status(403).json(err);
                }
                user.password = undefined;
                return res.json({ success: true, token: token, user: user });
              }
            );
          } else {
            return res.status(400).json({ msg: "Invalid email or password" });
          }
        });
      })
      .catch((err) => res.status(422).json(err));
  },
  create: function ({ body }, res) {
    db.User.create(body)
      .then((userData) => {
        // Create JWT Payload
        const payload = { id: userData._id, username: userData.username };
        // Sign token
        jwt.sign(payload, keys.secretOrKey, {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            if (err) {
              return res.status(403).json(err);
            }
            userData.password = undefined;
            userData.token = token;
            return res.json(userData);
          }
        );
      })
      .catch((err) => {
        if (err.name == "ValidationError") {
          return res.status(400).json({ msg: err.message, err: err })
        } else if (err.name == "MongoError") {
          return res.status(400).json({ msg: err.message, err: err })
        } else {
          return res.status(422).json(err)
        }
      });
  },
  update: function ({ params, body }, res) {
    db.User.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    })
      .populate('pets')
      .then((userData) => res.json(userData))
      .catch((err) => {
        if (err.name == "ValidationError") {
          return res.status(400).json({ msg: err.message, err: err })
        } else if (err.name == "MongoError") {
          return res.status(400).json({ msg: err.message, err: err })
        } else {
          return res.status(422).json(err)
        }
      });
  },
  updatePassword: function ({ params, body }, res) {
    db.User.findById(params.id)
      .then((userData) => {
        userData.password = body.password;
        userData
          .save()
          .then((userData) => res.json({ msg: "Password Reset" }))
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(422).json(err));
  },
  remove: function ({ params }, res) {
    db.User.findByIdAndDelete(params.id)
      .then((userData) => res.json({ msg: userData.username + " was removed" }))
      .catch((err) => res.status(422).json(err));
  },
  verify: function({ params }, res){
    if ( typeof params.token !== 'undefined') {
      const { token } = params
      jwt.verify(token, keys.secretOrKey,
        (err, authData) => {
        if (err) {
          return res.status(403).json(err)
        }
        return res.json(authData)
      })
    } else {
      return res.status(403).json({ msg: "No token found" })
    }
  }
};
