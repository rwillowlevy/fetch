const {isEmail} = require('validator');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required'],
    trim: true,
    maxlength: [20, 'Username cannot exceed 20 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    validate: [isEmail, "Invalid email"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, 'Password must be 6 or more characters'],
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
  pets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
  }, ],
  matches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
  }, ],
  pendingMatches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
  }, ],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  }, ],
});

// Run validators on updates
userSchema.pre('findOneAndUpdate', function (next) {
  this.options.runValidators = true;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;