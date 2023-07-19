const Habit = require("../models/habit");
const Goal = require("../models/goal");

module.exports = {
  create,
};

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
