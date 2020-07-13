const db = require("../models");


// Defining methods for the petsController
module.exports = {
  findAll: function (req, res) {
    db.Pet.find()
      .then((pets) => res.json(pets))
      .catch((err) => res.status(422).json(err));
  },
  findById: function ({ params }, res) {
    db.Pet.findById(params.id)
      .then((petData) => res.status(200).json(petData))
      .catch((err) => res.status(422).json(err));
  },
  uploadImage: function (req, res) {
    if (req.files == null) {
      return res.status(400).send({message: "No file uploaded"})
    }

    const file = req.files.file;

    file.mv(`${__dirname}/../client/public/uploads/${file.name}`, (err) => {
      if(err) {
        console.error(err)
        return res.status(500).send(err);
      }
      res.json({fileName: file.name, filePath: `/uploads/${file.name}`});
    })
   
  },
  create: function ({params, body}, res) {
    console.log(body);
    if (!db.User.findById(params.id)) {
      res.status(404).json({ message: "Invalid user ID" });
      return;
    }
    db.Pet.create(body)
      .then((petData) => {
        console.log("Added:", petData);
        db.User.findByIdAndUpdate(
          params.id,
          { $push: { pets: petData._id } },
          { new: true }
        )
          .select("-password")
          .populate("pets")
          .then((userData) => {
            res.status(200).json(userData);
          })
          .catch((err) => res.status(422).json(err));
      })
      .catch((err) => res.status(422).json(err));
  },
  update: function ({ params, body }, res) {
    db.Pet.findByIdAndUpdate(params.id, body, { new: true })
      .then((petData) => res.status(200).json(petData))
      .catch((err) => res.status(422).json(err));
  },
  remove: function ({ params }, res) {
    db.Pet.db.User.findOneAndDelete({
      _id: params.id,
    })
      .then((petData) => res.status(200).json(petData))
      .catch((err) => res.status(422).json(err));
  },
};
