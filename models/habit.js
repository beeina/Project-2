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
    goal: [{
      type: Schema.Types.ObjectId,
      ref: 'Goal'
    }],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    userName: String,
    userAvatar: String
  }, {
    timestamps: true,
  }
);

module.exports = mongoose.model("Habit", habitSchema);
