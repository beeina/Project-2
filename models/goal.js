const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goalSchema = new Schema(
  {
    goalDescription: {
      type: String,
    },
    progress: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
