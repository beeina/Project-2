const express = require("express");
const router = express.Router();

const habitsCtrl = require("../controllers/habits");
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /habits
router.get('/', habitsCtrl.index);
// GET /habits/new
router.get('/new', ensureLoggedIn, habitsCtrl.new);
// GET /habits/:id (show functionality)
router.get('/:id', habitsCtrl.show);
// POST /habits
router.post('/', habitsCtrl.add);

module.exports = router;
