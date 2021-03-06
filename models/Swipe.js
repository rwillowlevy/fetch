const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const swipeSchema = new Schema({
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
  },
  targetPetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
  }, 
  liked: {
    type: Boolean,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Swipe = mongoose.model("Swipe", swipeSchema);

module.exports = Swipe;
