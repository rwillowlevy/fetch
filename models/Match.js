const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matchSchema = new Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
