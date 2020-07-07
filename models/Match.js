const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matchSchema = new Schema({
  pet1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
  },
  pet2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
  }, 
  pet1Like: {
    type: Boolean,
    default: null,
  },
  pet2Like: {
    type: Boolean,
    default: null,
  }
});

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
