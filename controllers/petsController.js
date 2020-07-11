const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findById: function ({ params }, res) {
    db.Pet.findById(params.id)
      .then((petData) => res.json(petData))
      .catch((err) => res.status(422).json(err));
  },
  create: function ({ params, body }, res) {
    db.Pet.create(body)
      .then((petData) => {
        db.User.findOneAndUpdate(params.id, { $push: { pets: petData._id }}, { new: true })
          .then(userData => {
            userData.password = "REDACTED";
            res.json(userData)
          })
          .catch((err) => res.status(422).json(err));
      })
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Pet.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((petData) => res.json(petData))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Pet.db.User.findOneAndDelete({
      _id: req.params.id,
    })
      .then((petData) => res.json(petData))
      .catch((err) => res.status(422).json(err));
  },
};
