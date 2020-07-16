const db = require("../models");

// Defining methods for the swipesController
module.exports = {
  find: function(req, res) {
    db.Swipe
      .findById(req.params.id)
      .then(swipeData => res.json(swipeData))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Swipe
      .findById(req.params.id)
      .then(swipeData => res.json(swipeData))
      .catch(err => res.status(422).json(err));
  },
  create: function({ body }, res) {
    console.log("Creating")
    console.log(body)
    if(db.Swipe.findOne({ petId: body.petId, targetPetId: body.targetPetId })) {
      return res.status(422).json({msg: "Swipe already exists"})
    }
    db.Swipe.create(body)
      .then(swipeData => res.json(swipeData))
      .catch(err => res.status(422).json(err));
  },
  remove: function({ params }, res) {
    db.Swipe
      .findByIdAndDelete(params.id)
      .then(swipeData => res.json(swipeData))
      .catch(err => res.status(422).json(err));
  }
};
