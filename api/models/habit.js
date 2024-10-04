const mongoose = require("mongoose");

//this is an model//
//we are going to initialize the schema!!//
const habitSchema = new mongoose.Schema({
  title: {
    type: String,
    requied: true,
  },
  color: {
    type: String,
    requied: true,
  },
  repeatMode: {
    type: String,
    enum: ["daily", "weekly"],
    default: "daily",
  },
  reminder: {
    type: Boolean,
    default: false,
  },
  completed: {
    type: Object,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;