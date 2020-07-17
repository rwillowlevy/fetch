const db = require("../models");

// Defining methods for the matchesController
module.exports = {
  find: function({ body }, res) {
    db.Match.find({}).and([
      {$or: {pet1Id: body.petId}},
      {$or: {pet2Id: body.petId}}
    ])
      .then(matchData => res.json(matchData))
      .catch(err => res.status(422).json(err));
  },
  create: function({ body }, res) {
    db.Match
      .create(body)
      .then(matchData => res.json(matchData))
      .catch(err => res.status(422).json(err));
  },
  remove: function({ params }, res) {
    db.Match
      .findByIdAndDelete(params.id)
      .then(matchData => res.json({ msg: "Match deleted!"} ))
      .catch(err => res.status(422).json(err));
  }
};
