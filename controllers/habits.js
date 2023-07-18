const Habit = require("../models/habit");
const moment = require("moment");

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
  let foundhabits = await Habit.find({});
  let habits = [];
  foundhabits.forEach(function (h) {
    h.formattedStartDate = moment(h.startDate).format("LL");
    h.formattedTargetDate = moment(h.targetDate).format('LL');
    // console.log(startDate);
    habits.push(h);
  });

  res.render("habits/index", { title: "All Habits", habits });
}

async function show(req, res) {
  const habit = await Habit.findById(req.params.id);
  habit.formattedStartDate = moment(habit.startDate).format("LL");
  habit.formattedTargetDate = moment(habit.targetDate).format('LL');
  res.render("habits/show", { title: "Habit Detail", habit });
}
