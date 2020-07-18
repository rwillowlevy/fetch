const db = require("../models");
const imgur = require('../config/imgur');
const FIND_PETS_LIMIT = 25;



// Defining methods for the petsController
module.exports = {
  findAll: function (req, res) {
    db.Pet.find().limit(FIND_PETS_LIMIT)
      .then(petsData => {
        if (!petsData) {
          return res.status(400).json({ msg: "No pets found :(" })
        }
        return res.json(petsData)
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function ({ params }, res) {
    db.Pet.findById(params.id)
      .then((petData) => {
        if (!petData) {
          return res.status(400).json({ msg: "No pet found :(" })
        }
        return res.json(petData)
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
      const encoded = data.toString('base64')
      const imgurRes = await imgur.uploadBase64(encoded);
      const uploadRes = imgurRes.data;
      console.log("Upload Response:", uploadRes);
      res.json(uploadRes);
    } catch(err) {
      res.status(500).json(err);
    }
  },
  create: function ({ params, body }, res) {
    console.log("Create Pet:", body)
    // Check for user
    if (!db.User.findById(params.id)) {
      res.status(400).json({ msg: "Invalid user ID" });
    }
    // Create pet
    db.Pet.create(body)
      .then((petData) => {
        // Add pet to user pets array
        db.User.findByIdAndUpdate(params.id,
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
  remove: function ({ params }, res) {
    db.Pet.findByIdAndDelete(params.id)
      .then((petData) => res.json({ msg: petData.name + " was removed" }))
      .catch((err) => res.status(422).json(err));
  },
};
