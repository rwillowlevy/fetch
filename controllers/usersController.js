const db = require("../models");

// usersController methods
module.exports = {
  findById: function (req, res) {
    db.User.findById(req.params.id)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(422).json(err));
  },
  login: function (req, res) {
    res.json(req.user);
  },
  create: function (req, res) {
    db.User.create(req.body)
      .then((userData) => {
        console.log(userData);
        res.json(userData);
      })
      .catch((err) => {
        if (err.name == "ValidationError") {
          console.error("Error Validating!", err);
          res.status(422).json(err);
        } else {
          console.error(err);
          res.status(500).json(err);
        }
      });
  },
  update: function (req, res) {
    db.User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
