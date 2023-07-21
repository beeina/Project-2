const Habit = require("../models/habit");
const Goal = require("../models/goal");
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
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
   
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
    h.formattedTargetDate = moment(h.targetDate).format("LL");
    
    habits.push(h);
  });

  res.render("habits/index", { title: "All Habits", habits });
}

async function show(req, res) {
  const habit = await Habit.findById(req.params.id).populate("goal");
  habit.formattedStartDate = moment(habit.startDate).format("LL");
  habit.formattedTargetDate = moment(habit.targetDate).format("LL");

  const goals = await Goal.find({ _id: { $nin: habit.goal } });
  
  res.render("habits/show", { title: "Habit Details", habit, goals });
}
