const db = require("../models");
const imgur = require("../config/imgur");
const { createIndexes } = require("../models/Pet");
const FIND_PETS_LIMIT = 25;

// Defining methods for the petsController
module.exports = {
  findAll: function (req, res) {
    db.Pet.find()
      .limit(FIND_PETS_LIMIT)
      .then((petsData) => {
        if (!petsData) {
          res.status(400).json({ msg: "No pets found :(" });
        }
        res.json(petsData);
      })
      .catch((err) => res.status(422).json(err));
  },
  findById: function ({ params }, res) {
    db.Pet.findById(params.id)
      .then((petData) => {
        if (!petData) {
          return res.status(400).json({ msg: "No pet found :(" });
        }
        return res.json(petData);
      })
      .catch((err) => res.status(422).json(err));
  },
  uploadImage: async function ({ params, files }, res) {
    // Check for files being uploaded
    if (!files) {
      return res.json({ fileName: "No Image", link: `/images/not-found.png` });
    }
    const { data } = files.file;
    try {
      const encoded = data.toString("base64");
      const imgurRes = await imgur.uploadBase64(encoded);
      const uploadRes = imgurRes.data;
      console.log("Upload Response:", uploadRes);
      res.json(uploadRes);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  create: function ({ params, body }, res) {
    console.log("Create Pet:", body);
    // Check for user
    if (!db.User.findById(params.id)) {
      res.status(400).json({ msg: "Invalid user ID" });
    }
    // Create pet
    db.Pet.create(body)
      .then((petData) => {
        // Add pet to user pets array
        db.User.findByIdAndUpdate(
          params.id,
          { $push: { pets: petData._id } },
          { new: true, runValidators: true }
        )
          .select("-password")
          .populate("pets")
          .then((userData) => res.json(userData))
          .catch((err) => res.status(422).json(err));
      })
      .catch((err) => res.status(422).json(err));
  },
  update: function ({ params, body }, res) {
    db.Pet.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    })
      .then((petData) => res.json(petData))
      .catch((err) => res.status(422).json(err));
  },
  remove: async function ({ params }, res) {
    try {
      const petData = await db.Pet.findByIdAndDelete(params.id);
      const removedPet = await db.User.findByIdAndUpdate(
        petData.userId,
        { $pull: { pets: petData._id }, $set: { matches: [] } },
        { new: true }
      );
      const removedSwipes = await db.Swipe.deleteMany({
        $or: [{ petId: petData._id }, { targetPetId: petData._id }],
      });
      const removedMatches = await db.Match.deleteMany({
        $or: [{ pet1Id: petData._id }, { pet2Id: petData._id }],
      });
      res.json({ msg: petData.name + " and all data was deleted" });
    } catch (err) {
      res.status(422).json(err);
    }
  },
};
