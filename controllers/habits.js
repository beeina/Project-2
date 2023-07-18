const Habit = require("../models/habit");

module.exports = {
  index,
  show,
  new: newHabit,
  add,
};

function newHabit(req, res) {
  res.render("habits/new", { title: "Add Habit", errorMsg: "" });
}

async function add(req, res) {
  try {
    console.log(req.body);
    await Habit.create(req.body);
    res.redirect("/habits");
  } catch (err) {
    console.log(err);
    res.render("habits/new", { errorMsg: err.message });
  }
}

async function index(req, res) {
  const habits = await Habit.find({});
  res.render("habits/index", { title: "All Habits", habits });
}

async function show(req, res) {
  const habit = await Habit.findById(req.params.id);
  res.render("habits/show", { title: "Habit Detail", habit });
}
