const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const habitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    startDate:Date,
    targetDate: Date,
    progress: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Habit", habitSchema);
