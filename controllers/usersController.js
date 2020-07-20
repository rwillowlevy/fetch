const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// usersController methods
module.exports = {
  findById: async function ({ params }, res) {
    try {
      const userData = await db.User.findById(params.id).populate("pets");
      return res.json(userData);
    } catch (err) {
      if (err.name == "CastError") {
        return res.status(422).json({ msg: "Invalid user ID" });
      }
      return res.status(500).json(err);
    }
  },
  findMatches: async function ({ params }, res) {
    try {
      const matchData = await db.User.findById(params.id)
        // Populate pets in matches array then populate user for each pet
        .populate({ path: "matches", populate: { path: "userId", model: "User" } });
      if (matchData.matches.length < 1) {
        return res.json({ msg: "No matches found, start swiping to match!" });
      }
      return res.json(matchData.matches);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  login: async function ({ body }, res) {
    try {
      // Find user by email
      const user = await db.User.findOne({ email: body.email })
        .select("+password")
        .populate("pets");
      // Check if user exists
      if (!user) {
        return res.status(403).json({ msg: "Invalid email or password" });
      }
      // Check password
      bcrypt.compare(body.password, user.password).then((isMatch) => {
        if (isMatch) {
          // User exists - Create JWT Payload
          const payload = { id: user._id, username: user.username };
          // Sign token
          jwt.sign(payload, keys.secretOrKey,
            {
              expiresIn: 31556926, // 1 year in seconds
            },
            (err, token) => {
              if(err) res.status(500).json(err);
              user.password = undefined;
              return res.json({ success: true, token: token, user: user });
            }
          );
        } else {
          return res.status(403).json({ msg: "Invalid email or password" });
        }
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  create: async function ({ body }, res) {
    try {
      const newUser = await db.User.create(body);
      // Create JWT Payload
      const payload = { id: newUser._id, username: newUser.username };
      // Sign token
      jwt.sign(
        payload,
        keys.secretOrKey,
        {
          expiresIn: 31556926, // 1 year in seconds
        },
        (err, token) => {
          if (err) {
            if(err) res.status(500).json(err);
          }
          newUser.password = undefined;
          newUser.token = token;
          res.json(newUser);
        }
      );
    } catch (err) {
      if (err.name == "ValidationError" || err.name == "MongoError") {
        return res.status(400).json({ msg: err.message });
      } else {
        return res.status(500).json(err);
      }
    }
  },
  update: async function ({ params, body }, res) {
    try {
      const updatedUser = await db.User.findByIdAndUpdate(params.id, body, {
        new: true, runValidators: true, })
        .populate("pets")
        return res.json(updatedUser);
    } catch (err) {
      if (err.name == "ValidationError" || err.name == "MongoError") {
        return res.status(400).json({ msg: err.message });
      } else {
        return res.status(500).json(err);
      }
    }
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
      return res.json({ msg: userData.username + " and all data was deleted" });
    } catch (err) {
      return res.status(422).json(err);
    }
  },
  verify: function ({ params }, res) {
    if (typeof params.token !== "undefined") {
      const { token } = params;
      jwt.verify(token, keys.secretOrKey, (err, authData) => {
        if (err) {
          return res.status(403).json(err);
        }
        return res.json(authData);
      });
    } else {
      return res.status(403).json({ msg: "No token found" });
    }
  },
};
