const express = require('express');
const router = express.Router();
const goalsCtrl = require('../controllers/goals');
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.post('/habits/:id/goal', ensureLoggedIn, goalsCtrl.create);


module.exports = router;