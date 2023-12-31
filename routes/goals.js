const express = require("express");
const router = express.Router();
const goalsCtrl = require("../controllers/goals");
const ensureLoggedIn = require("../config/ensureLoggedIn");

// POST /habits/:id/goals (create goal for habit)
router.post("/habits/:id/goal", ensureLoggedIn, goalsCtrl.create);

router.put("/goals/update/:habitId/:goalId", ensureLoggedIn, goalsCtrl.update);
// DELETE /goals
router.delete("/goals/:habitId/:goalId", ensureLoggedIn, goalsCtrl.delete);

router.get("/goals/edit/:habitId/:goalId", goalsCtrl.edit);

module.exports = router;
