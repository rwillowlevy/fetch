const db = require("../models");
const chalk = require('chalk');

// Defining methods for the swipesController
module.exports = {
  find: function (req, res) {
    db.Swipe.findById(req.params.id)
      .then((swipeData) => res.json(swipeData))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Swipe.findById(req.params.id)
      .then((swipeData) => res.json(swipeData))
      .catch((err) => res.status(422).json(err));
  },
  create: async function ({ body }, res) {
    console.log("Data:", body)
    const validSwipe = await db.Swipe.findOne({ petId: body.petId, targetPetId: body.targetPetId });
    console.log("Valid?", validSwipe);
    if(validSwipe !== null) {
      return res.json({msg: "Swipe already exists"});
    } else {
      const newSwipe = await db.Swipe.create({ petId: body.petId, targetPetId: body.targetPetId, liked: body.liked });
      const isMatch = await db.Swipe.findOne({ petId: body.targetPetId, targetPetId: body.petId, liked: true });
      console.log("Match?", isMatch)
      if(isMatch !== null && body.liked == true) {
        const newMatch = await db.Match.create({pet1Id: body.targetPetId, pet2Id: body.petId});
        const addMatchUser = await db.User.findByIdAndUpdate(body.userId, {$push: {matches: body.targetPetId}});
        const addMatchTargetUser = await db.User.findByIdAndUpdate(body.targetUserId, {$push: {matches: body.petId}});
        return res.json({ msg: "It's a match!" });
      } else {
        return res.json({msg: "No match, swipe created"});
      }
    }
  },
  remove: function ({ params }, res) {
    db.Swipe.findByIdAndDelete(params.id)
      .then((swipeData) => res.json(swipeData))
      .catch((err) => res.status(422).json(err));
  },
};
