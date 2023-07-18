const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const habitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    startDate: {
      type: Number,
    },
    targetDate: {
      type: Number,
    },
    progress: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Habit", habitSchema);
