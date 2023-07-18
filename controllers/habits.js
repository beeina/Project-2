const Habit = require("../models/habit");

module.exports = {
  index,
};

async function index(req, res) {
  const habits = await Habit.find({});
  res.render("habits/index", { title: "All Habits", habits });
}

