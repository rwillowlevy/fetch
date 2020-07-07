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
  }
});

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
