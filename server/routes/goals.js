const { Router } = require('express');
const GoalsController = require('../controllers/GoalsController');

const router = Router();

router.get('/get_goals', GoalsController.GetGoals);
router.post('/add_goal', GoalsController.CreateGoal);
router.put('/update_goal/:id', GoalsController.UpdateGoal);
router.put('/complete_goal/:id', GoalsController.CompleteGoal);

module.exports = router;