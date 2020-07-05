const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  age: {
    type: Number,
  },
  size: {
    type: String,
    enum: ["Toy", "Small", "Medium", "Large", "Extra Large"],
    // Toy under 12lbs |  Small 12-25lbs | Medium 25-50lbs | Large 50-100lbs | Extra Large 100+lbs
  },
  bio: {
    type: String,
  },
  temperament: [
    {
      type: String,
    },
  ],
  isVaccinated: {
    type: Boolean,
  },
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
