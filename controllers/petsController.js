const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findById: function ({ params }, res) {
    db.Pet.findById(params.id)
      .then((petData) => res.status(200).json(petData))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    console.log("Req", req);
    db.Pet.create(req.body)
      .then((petData) => {
        console.log("Added:", petData)
        db.User.findByIdAndUpdate(
          req.params.id,
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
