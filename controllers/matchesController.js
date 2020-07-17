const db = require("../models");

// Defining methods for the matchesController
module.exports = {
  find: function({body}, res) {
    db.Match.find({}).and([
      {$or: {pet1Id: body.petId}},
      {$or: {pet2Id: body.petId}}
    ])
      .then(matchData => {
        console.log(matchData)
        res.json(matchData)})
      .catch(err => res.status(422).json(err));
  },
  create: function({body}, res) {
    db.Match
      .create(body)
      .then(matchData => res.json(matchData))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Match
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
