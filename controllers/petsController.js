const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findById: function ({ params }, res) {
    db.Pet.findById(params.id)
      .then((petData) => res.status(200).json(petData))
      .catch((err) => res.status(422).json(err));
  },
  uploadImage: function (req, res) {
    // Check for files being uploaded
    if (req.files == null) {
      return res.status(400).send({msg: "No file uploaded"})
    }
    const { file } = req.files;
    // Move uploaded file to public uploads folder
    file.mv(`${__dirname}/../client/public/uploads/${file.name}`, (err) => {
      if(err) {
        console.error(err)
        return res.status(500).send(err);
      }
      res.json({fileName: file.name, filePath: `/uploads/${file.name}`});
    })
   
  },
  create: function ({ params, body }, res) {
    // Check for user
    if(!db.User.findById(params.id)) {
      res.status(404).json({msg: "Invalid user ID"})
    }
    // Create pet
    db.Pet.create(body)
      .then((petData) => {
        console.log("Added:", petData)
        // Add pet to user pets array
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
  update: function ({params, body}, res) {
    db.Pet.findByIdAndUpdate(params.id, body, { new: true})
      .then((petData) => res.status(200).json(petData))
      .catch((err) => res.status(422).json(err));
  },
  remove: function ({params}, res) {
    db.Pet.db.User.findOneAndDelete({
      _id: params.id,
    })
      .then((petData) => res.status(200).json(petData))
      .catch((err) => res.status(422).json(err));
  },
};
