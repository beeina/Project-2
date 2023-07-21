const Habit = require("../models/habit");
const Goal = require("../models/goal");

module.exports = {
  create,
  delete: deleteGoal,
  edit,
  update,
};

async function update(req, res) {
  const goal = await Goal.findById(req.params.goalId);
  const habit = await Habit.findById(req.params.habitId);
  goal.goalDescription = req.body.goalDescription;
  goal.progress = req.body.progress;
  // console.log(goal);
  await goal.save();
  updateHabit(habit, goal.progress);
  res.redirect(`/habits`);
}

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
  updateHabit(habit, goal.progress);
  res.redirect(`/habits/${habit._id}`);
}

async function edit(req, res) {
  const goal = await Goal.findById(req.params.goalId);
  const habit = await Habit.findById(req.params.habitId);
  // console.log(goal);
  // const goal = habit.goals.id(req.params.id);
  // Render the comments/edit.ejs template, passing to it the comment
  res.render("goals/edit", { title: "Edit Goal", goal: goal, habit: habit });
}

async function updateHabit(habit, goalProgress) {
  let totalProgress = habit.progress + goalProgress;

  console.log(totalProgress);
  console.log(habit.goal.length);
  habit.progress = totalProgress / habit.goal.length;

  try {
    await habit.save();
  } catch (err) {
    console.log(err);
  }
}
