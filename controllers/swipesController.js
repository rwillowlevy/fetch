const db = require("../models");

// Defining methods for the swipesController
module.exports = {
  findById: async function ({ params }, res) {
    try {
      const swipeData = await db.Swipe.findById(params.id);
      if (!swipeData) {
        res.status(400).json({ msg: "Data could not be found" });
      }
      res.json(swipeData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  create: async function ({ body }, res) {
    try {
      const validSwipe = await db.Swipe.findOne({ petId: body.petId, targetPetId: body.targetPetId });
      if(validSwipe !== null) {
        res.json({msg: "Swipe already exists"});
      } else {
        const newSwipe = await db.Swipe.create({ petId: body.petId, targetPetId: body.targetPetId, liked: body.liked });
        const isMatch = await db.Swipe.findOne({ petId: body.targetPetId, targetPetId: body.petId, liked: true });
        if(isMatch !== null && body.liked == true) {
          const newMatch = await db.Match.create({pet1Id: body.targetPetId, pet2Id: body.petId});
          const addMatchUser = await db.User.findByIdAndUpdate(body.userId, {$push: {matches: body.targetPetId}});
          const addMatchTargetUser = await db.User.findByIdAndUpdate(body.targetUserId, {$push: {matches: body.petId}});
          res.json({ msg: "It's a match!" });
        } else {
          res.json({msg: "No match, swipe created"});
        }
      }
    } catch (err) {
      res.status(422).json(err);
    }
  },
  remove: async function ({ params }, res) {
    try {
      const removedSwipe = await db.Swipe.findByIdAndDelete(params.id)
      res.json({ msg: "Data was removed" })
    } catch (err) {
      res.status(422).json(err)
    }
  },
};
