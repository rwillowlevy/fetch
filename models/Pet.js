const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const db = require("../models");

const petSchema = new Schema({
  name: {
    type: String,
    required: [true, "Arf! Doesn't your pooch have a name?"],
    trim: true,
    maxlength: [30, "Woof, that name is a little long, does your pup have a shorter nickname?"],
  },
  image: {
    type: String,
  },
  age: {
    type: String,
    required: [true, "Enter your pup's relative age group"],
    enum: ["Puppy", "Junior", "Adult", "Mature", "Senior"],
    // Depends on breed, a bit arbitrary: Puppy 2-12mos | Junior 6-12mos | Adult 1-7yrs | Mature 7+yrs | Senior 10+yrs 
  },
  gender: {
    type: String,
    required: [true, "Enter your pup's gender"],
    enum: ["Female", "Male"]
  },
  size: {
    type: String,
    required: [true, "Enter a size for your pup"],
    enum: ["Toy", "Small", "Medium", "Large", "Extra Large"],
    // Toy under 12lbs |  Small 12-25lbs | Medium 25-50lbs | Large 50-100lbs | Extra Large 100+lbs
  },
  breed: {
    type: String,
    required: [true, "What kind of pet do you have?"],
  },
  isVaccinated: {
    type: Boolean,
    default: false
  },
  bio: {
    type: String,
    maxlength: [500, "Woof, that bio is a little too long."],
  },
  pendingMatches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
  }, ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

petSchema.post('remove', function(next) {
  db.User.remove(
      { submission_ids : this.userId}, 
      { $pull: { submission_ids: this._id } })
  .exec();
  next();
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
