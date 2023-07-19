const Habit = require("../models/habit");
const Goal = require("../models/goal");
const habit = require("../models/habit");
const goal = require("../models/goal");

module.exports = {
  create,
  delete: deleteGoal,
};

async function deleteGoal(req, res) {
  const habit = await Habit.findById(req.params.habitId);
  // console.log(habit);
  // console.log(req.params);
  // Rogue user!
  if (!habit) return res.redirect("/habits");
  // Remove the goals using the remove method available on Mongoose arrays
  habit.goal.remove(req.params.goalId);
  await habit.save();
  res.redirect(`/habits/${habit._id}`);
}

async function create(req, res) {
  const goal = await Goal.create(req.body);
  console.log(goal);
  console.log("id is " + req.params.id);
  const habit = await Habit.findById(req.params.id);

  habit.goal.push(goal._id);

  try {
    await habit.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/habits/${habit._id}`);
}
