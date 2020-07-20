const db = require("../models");
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
          res.status(400).json({ msg: "Invalid user ID" });
        }
        res.json(userData);
      })
      .catch((err) => res.status(422).json(err));
  },
  findMatches: function ({ params }, res) {
    db.User.findById(params.id)
      .populate({
        // Populate pets in matches array then populate user for each pet
        path: "matches",
        populate: { path: "userId", model: "User" },
      })
      .then((userData) => {
        if (!userData) {
          res
            .status(400)
            .json({ msg: "No matches found, start swiping to match!" });
        }
        res.json(userData.matches);
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
          res.status(400).json({ msg: "Invalid email or password" });
        }
        // Check password
        bcrypt.compare(body.password, user.password).then((isMatch) => {
          if (isMatch) {
            // User exists - Create JWT Payload
            const payload = { id: user._id, username: user.username };
            // Sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              {
                expiresIn: 31556926, // 1 year in seconds
              },
              (err, token) => {
                if (err) {
                  res.status(403).json(err);
                }
                user.password = undefined;
                res.json({ success: true, token: token, user: user });
              }
            );
          } else {
            res.status(400).json({ msg: "Invalid email or password" });
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
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            if (err) {
              res.status(403).json(err);
            }
            userData.password = undefined;
            userData.token = token;
            res.json(userData);
          }
        );
      })
      .catch((err) => {
        if (err.name == "ValidationError") {
          res.status(400).json({ msg: err.message, err: err });
        } else if (err.name == "MongoError") {
          res.status(400).json({ msg: err.message, err: err });
        } else {
          res.status(422).json(err);
        }
      });
  },
  update: function ({ params, body }, res) {
    db.User.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    })
      .populate("pets")
      .then((userData) => res.json(userData))
      .catch((err) => {
        if (err.name == "ValidationError") {
          res.status(400).json({ msg: err.message, err: err });
        } else if (err.name == "MongoError") {
          res.status(400).json({ msg: err.message, err: err });
        } else {
          res.status(422).json(err);
        }
      });
  },
  updatePassword: function ({ params, body }, res) {
    db.User.findById(params.id)
      .select("+password")
      .then((userData) => {
        userData.password = body.password;
        userData
          .save()
          .then((userData) => res.json({ msg: "Password Reset" }))
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(422).json(err));
  },
  remove: async function ({ params }, res) {
    try {
      const userData = await db.User.findByIdAndDelete(params.id);
      console.log(userData.pets[0]);
      if (userData.pets.length > 0) {
        const removedPet = await db.Pet.findByIdAndDelete(userData.pets[0]);
        if (userData.matches.length > 0) {
          const removedSwipes = await db.Swipe.deleteMany({
            $or: [
              { petId: userData.pets[0] },
              { targetPetId: userData.pets[0] },
            ],
          });
          const removedMatches = await db.Match.deleteMany({
            $or: [{ pet1Id: userData.pets[0] }, { pet2Id: userData.pets[0] }],
          });
        }
      }
      res.json({ msg: userData.username + " and all data was deleted" });
    } catch (err) {
      res.status(422).json(err);
    }
  },
  verify: function ({ params }, res) {
    if (typeof params.token !== "undefined") {
      const { token } = params;
      jwt.verify(token, keys.secretOrKey, (err, authData) => {
        if (err) {
          res.status(403).json(err);
        }
        res.json(authData);
      });
    } else {
      res.status(403).json({ msg: "No token found" });
    }
  },
};
