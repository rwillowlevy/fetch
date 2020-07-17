const {isEmail} = require('validator');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

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
    unique: true,
    required: [true, 'Email is required'],
    trim: true,
    validate: [isEmail, "Invalid email"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
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
    ref: "Pet",
  }, ],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  }, ],
});

// Salt and hash passwords on user creation
userSchema.pre('save', function(next) {
  let user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    console.log("Password was not modified")
    return next();
  }
  // generate a salt
  bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});

const User = mongoose.model("User", userSchema);

module.exports = User;