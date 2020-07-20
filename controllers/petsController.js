const db = require("../models");
const imgur = require("../config/imgur");
const FIND_PETS_LIMIT = 25;

// Defining methods for the petsController
module.exports = {
  find: async function (req, res) {
    try {
      const petsData = await db.Pet.find().limit(FIND_PETS_LIMIT);
      if (!petsData) {
        res.status(400).json({ msg: "No pets found :(" });
      }
      res.json(petsData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  findById: async function ({ params }, res) {
    try {
      const petData = await db.Pet.findById(params.id);
      if (!petData) {
        res.status(400).json({ msg: "No pet found :(" });
      }
      res.json(petData);
    } catch (err) {
      res.status(500).json(err);
    }
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
  create: async function ({ params, body }, res) {
    try {
      const userExists = await db.User.findById(params.id);
      // Check for user
      if (!userExists) {
        res.status(400).json({ msg: "Invalid user ID" });
      }
      // Create pet
      const newPet = await db.Pet.create(body);
      // Add pet to user pets array
      const updatedUser = await db.User.findByIdAndUpdate(params.id,
        { $push: { pets: newPet._id } },
        { new: true, runValidators: true }
      )
      .select("-password")
      .populate("pets")
      res.json(updatedUser);
    } catch (err) {
      if (err.name == "ValidationError" || err.name == "MongoError") {
        res.status(400).json({ msg: err.message });
      } else {
        res.status(500).json(err);
      }
    }
  },
  update: async function ({ params, body }, res) {
    try {
      const updatedPet = await db.Pet.findByIdAndUpdate(params.id, body, {
        new: true,
        runValidators: true,
      })
      res.json(updatedPet);
    } catch (err) {
      if (err.name == "ValidationError" || err.name == "MongoError") {
        res.status(400).json({ msg: err.message });
      } else {
        res.status(500).json(err);
      }
    }
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
