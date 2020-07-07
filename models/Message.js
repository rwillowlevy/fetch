const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dateSent: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
